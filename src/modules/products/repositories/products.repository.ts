import { count, eq } from 'drizzle-orm';
import type { Db } from '@/infra/db/client.js';
import { type Product, products } from '@/infra/db/schema/index.js';
import type { IProductsRepository } from '../interfaces/products.repository.interface.js';
import type {
	CreateProductBody,
	ListProductsQuery,
	UpdateProductBody,
} from '../schemas/index.js';

export class ProductsRepository implements IProductsRepository {
	private db: Db;
	constructor({ db }: { db: Db }) {
		this.db = db;
	}

	async findById(id: string): Promise<Product | null> {
		const [product] = await this.db
			.select()
			.from(products)
			.where(eq(products.id, id))
			.limit(1);
		return product ?? null;
	}

	async findAll(
		query: ListProductsQuery,
	): Promise<{ data: Product[]; total: number }> {
		const { page = 1, limit = 10 } = query;
		const offset = (page - 1) * limit;

		const [rows, [{ value: total }]] = await Promise.all([
			this.db.select().from(products).limit(limit).offset(offset),
			this.db.select({ value: count() }).from(products),
		]);

		return { data: rows, total: Number(total) };
	}

	async create(data: CreateProductBody): Promise<Product> {
		const [product] = await this.db.insert(products).values(data).returning();
		return product;
	}

	async update(id: string, data: UpdateProductBody): Promise<Product | null> {
		const [product] = await this.db
			.update(products)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(products.id, id))
			.returning();
		return product ?? null;
	}
}
