import { count, eq } from 'drizzle-orm';
import type { Db } from '../../../infra/db/client.js';
import { gallerySales } from '../../../infra/db/schema/index.js';
import type { IGallerySalesRepository } from '../interfaces/gallery-sales.repository.interface.js';
import type {
	CreateGallerySaleBody,
	GallerySaleDto,
	ListGallerySalesQuery,
	UpdateGallerySaleBody,
} from '../schemas/gallery-sales.js';

export class GallerySalesRepository implements IGallerySalesRepository {
	private db: Db;
	constructor({ db }: { db: Db }) {
		this.db = db;
	}

	async findById(id: string): Promise<GallerySaleDto | null> {
		const [row] = await this.db
			.select()
			.from(gallerySales)
			.where(eq(gallerySales.id, id))
			.limit(1);
		return row ? this.toDto(row) : null;
	}

	async findAll(query: ListGallerySalesQuery): Promise<{ data: GallerySaleDto[]; total: number }> {
		const { page = 1, limit = 20 } = query;
		const offset = (page - 1) * limit;

		const [rows, [{ value: total }]] = await Promise.all([
			this.db.select().from(gallerySales).limit(limit).offset(offset),
			this.db.select({ value: count() }).from(gallerySales),
		]);

		return { data: rows.map(this.toDto), total: Number(total) };
	}

	async create(data: CreateGallerySaleBody): Promise<GallerySaleDto> {
		const [row] = await this.db
			.insert(gallerySales)
			.values({ ...data, soldAt: new Date(data.soldAt) })
			.returning();
		return this.toDto(row);
	}

	async update(id: string, data: UpdateGallerySaleBody): Promise<GallerySaleDto | null> {
		const values: Record<string, unknown> = { ...data, updatedAt: new Date() };
		if (data.soldAt) values.soldAt = new Date(data.soldAt);

		const [row] = await this.db
			.update(gallerySales)
			.set(values)
			.where(eq(gallerySales.id, id))
			.returning();
		return row ? this.toDto(row) : null;
	}

	async delete(id: string): Promise<boolean> {
		const [row] = await this.db
			.delete(gallerySales)
			.where(eq(gallerySales.id, id))
			.returning({ id: gallerySales.id });
		return !!row;
	}

	private toDto(row: typeof gallerySales.$inferSelect): GallerySaleDto {
		return {
			id: row.id,
			soldAt: row.soldAt.toISOString(),
			description: row.description,
			imgUrl: row.imgUrl,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}
}
