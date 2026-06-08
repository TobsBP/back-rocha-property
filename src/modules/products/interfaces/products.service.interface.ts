import type { Product } from '../../../infra/db/schema/products.js';
import type { CreateProductBody, UpdateProductBody, ListProductsQuery } from '../schemas/index.js';

export interface IProductsService {
	getById(id: string): Promise<Product>;
	list(query: ListProductsQuery): Promise<{ data: Product[]; total: number }>;
	create(data: CreateProductBody): Promise<Product>;
	update(id: string, data: UpdateProductBody): Promise<Product>;
}
