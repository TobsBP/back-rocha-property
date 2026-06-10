import { count, eq } from 'drizzle-orm';
import type { Db } from '@/infra/db/client.js';
import { type Property, properties } from '@/infra/db/schema/index.js';
import type { IPropertiesRepository } from '../interfaces/properties.repository.interface.js';
import type {
	AdminPropertySummary,
	CreatePropertyBody,
	ListPropertiesQuery,
	UpdatePropertyBody,
} from '../schemas/index.js';

export class PropertiesRepository implements IPropertiesRepository {
	private db: Db;
	constructor({ db }: { db: Db }) {
		this.db = db;
	}

	async findById(id: string): Promise<Property | null> {
		const [property] = await this.db
			.select()
			.from(properties)
			.where(eq(properties.id, id))
			.limit(1);
		return property ?? null;
	}

	async findAll(
		query: ListPropertiesQuery,
	): Promise<{ data: Property[]; total: number }> {
		const { page = 1, limit = 10 } = query;
		const offset = (page - 1) * limit;

		const [rows, [{ value: total }]] = await Promise.all([
			this.db.select().from(properties).limit(limit).offset(offset),
			this.db.select({ value: count() }).from(properties),
		]);

		return { data: rows, total: Number(total) };
	}

	async findAllSummary(
		query: ListPropertiesQuery,
	): Promise<{ data: AdminPropertySummary[]; total: number }> {
		const { page = 1, limit = 10 } = query;
		const offset = (page - 1) * limit;

		const [rows, [{ value: total }]] = await Promise.all([
			this.db
				.select({
					id: properties.id,
					name: properties.title,
					neighborhood: properties.neighborhood,
					city: properties.city,
					state: properties.state,
					status: properties.status,
					price: properties.price,
				})
				.from(properties)
				.limit(limit)
				.offset(offset),
			this.db.select({ value: count() }).from(properties),
		]);

		const data = rows.map(({ neighborhood, city, state, ...rest }) => ({
			...rest,
			location: [neighborhood, `${city} - ${state}`].filter(Boolean).join(', '),
		}));

		return { data, total: Number(total) };
	}

	async create(data: CreatePropertyBody): Promise<Property> {
		const [property] = await this.db
			.insert(properties)
			.values(data)
			.returning();
		return property;
	}

	async update(id: string, data: UpdatePropertyBody): Promise<Property | null> {
		const [property] = await this.db
			.update(properties)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(properties.id, id))
			.returning();
		return property ?? null;
	}
}
