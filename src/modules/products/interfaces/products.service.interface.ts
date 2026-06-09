import type { Product } from '@/infra/db/schema/products.js';
import type {
	CreateProductBody,
	ListProductsQuery,
	UpdateProductBody,
} from '../schemas/index.js';

export interface IProductsService {
	getById(id: string): Promise<Product>;
	list(query: ListProductsQuery): Promise<{
		data: Product[];
		meta: { total: number; page: number; limit: number; totalPages: number };
	}>;
	create(data: CreateProductBody): Promise<Product>;
	update(id: string, data: UpdateProductBody): Promise<Product>;
}
