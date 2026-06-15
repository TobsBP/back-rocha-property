import { count, desc, eq } from 'drizzle-orm';
import type { Db } from '../../../infra/db/client.js';
import { leads } from '../../../infra/db/schema/index.js';
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
				.select()
				.from(leads)
				.limit(limit)
				.offset(offset)
				.orderBy(desc(leads.createdAt)),
			this.db.select({ value: count() }).from(leads),
		]);

		return {
			rows: rows.map((row) => ({
				...row,
				propertyId: row.propertyId ?? undefined,
				createdAt: row.createdAt.toISOString(),
				updatedAt: row.updatedAt.toISOString(),
			})),
			total: Number(total),
		};
	}

	async findById(id: string): Promise<LeadDto | null> {
		const [row] = await this.db
			.select()
			.from(leads)
			.where(eq(leads.id, id))
			.limit(1);

		if (!row) return null;

		return {
			...row,
			propertyId: row.propertyId ?? undefined,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	async create(data: CreateLeadBody): Promise<LeadDto> {
		const [row] = await this.db.insert(leads).values(data).returning();

		return {
			...row,
			propertyId: row.propertyId ?? undefined,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	async delete(id: string): Promise<LeadDto | null> {
		const [row] = await this.db
			.delete(leads)
			.where(eq(leads.id, id))
			.returning();

		if (!row) return null;

		return {
			...row,
			propertyId: row.propertyId ?? undefined,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}
}
