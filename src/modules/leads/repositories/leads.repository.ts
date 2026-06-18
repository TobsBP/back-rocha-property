import { count, desc, eq } from 'drizzle-orm';
import type { Db } from '../../../infra/db/client.js';
import { leads, properties } from '../../../infra/db/schema/index.js';
import type { ILeadsRepository } from '../interfaces/leads.repository.interface.js';
import type { CreateLeadBody, LeadDto } from '../schemas/index.js';

export class LeadsRepository implements ILeadsRepository {
	private db: Db;
	constructor({ db }: { db: Db }) {
		this.db = db;
	}

	async findAll(page: number, limit: number) {
		const offset = (page - 1) * limit;

		const [rows, [{ value: total }]] = await Promise.all([
			this.db
				.select({
					id: leads.id,
					name: leads.name,
					email: leads.email,
					phone: leads.phone,
					message: leads.message,
					propertyId: leads.propertyId,
					propertyName: properties.title,
					createdAt: leads.createdAt,
					updatedAt: leads.updatedAt,
				})
				.from(leads)
				.leftJoin(properties, eq(leads.propertyId, properties.id))
				.limit(limit)
				.offset(offset)
				.orderBy(desc(leads.createdAt)),
			this.db.select({ value: count() }).from(leads),
		]);

		return {
			rows: rows.map((row) => ({
				...row,
				propertyId: row.propertyId ?? undefined,
				propertyName: row.propertyName ?? undefined,
				createdAt: row.createdAt.toISOString(),
				updatedAt: row.updatedAt.toISOString(),
			})),
			total: Number(total),
		};
	}

	async findById(id: string): Promise<LeadDto | null> {
		const [row] = await this.db
			.select({
				id: leads.id,
				name: leads.name,
				email: leads.email,
				phone: leads.phone,
				message: leads.message,
				propertyId: leads.propertyId,
				propertyName: properties.title,
				createdAt: leads.createdAt,
				updatedAt: leads.updatedAt,
			})
			.from(leads)
			.leftJoin(properties, eq(leads.propertyId, properties.id))
			.where(eq(leads.id, id))
			.limit(1);

		if (!row) return null;

		return {
			...row,
			propertyId: row.propertyId ?? undefined,
			propertyName: row.propertyName ?? undefined,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	async create(data: CreateLeadBody): Promise<LeadDto> {
		const [inserted] = await this.db.insert(leads).values(data).returning();

		const result = await this.findById(inserted.id);
		if (!result) {
			throw new Error('Failed to retrieve lead after creation');
		}
		return result;
	}

	async delete(id: string): Promise<LeadDto | null> {
		const existing = await this.findById(id);
		if (!existing) return null;

		await this.db.delete(leads).where(eq(leads.id, id));

		return existing;
	}
}
