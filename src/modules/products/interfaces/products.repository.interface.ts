import type { Product } from '../../../infra/db/schema/products.js';
import type { CreateProductBody, UpdateProductBody, ListProductsQuery } from '../schemas/index.js';

export interface IProductsRepository {
	findById(id: string): Promise<Product | null>;
	findAll(query: ListProductsQuery): Promise<{ data: Product[]; total: number }>;
	create(data: CreateProductBody): Promise<Product>;
	update(id: string, data: UpdateProductBody): Promise<Product | null>;
}
