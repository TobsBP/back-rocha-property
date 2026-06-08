import { NotFoundError } from '../../../core/errors/index.js';
import type { Product } from '../../../infra/db/schema/products.js';
import type { IProductsRepository } from '../interfaces/products.repository.interface.js';
import type { IProductsService } from '../interfaces/products.service.interface.js';
import type {
	CreateProductBody,
	UpdateProductBody,
	ListProductsQuery,
} from '../schemas/index.js';

export class ProductsService implements IProductsService {
	private repo: IProductsRepository;
	constructor({
		productsRepository,
	}: { productsRepository: IProductsRepository }) {
		this.repo = productsRepository;
	}

	async getById(id: string): Promise<Product> {
		const item = await this.repo.findById(id);
		if (!item) throw new NotFoundError('Product', id);
		return item;
	}

	async list(
		query: ListProductsQuery,
	): Promise<{ data: Product[]; total: number }> {
		return this.repo.findAll(query);
	}

	async create(data: CreateProductBody): Promise<Product> {
		return this.repo.create(data);
	}

	async update(id: string, data: UpdateProductBody): Promise<Product> {
		const item = await this.repo.update(id, data);
		if (!item) throw new NotFoundError('Product', id);
		return item;
	}
}
