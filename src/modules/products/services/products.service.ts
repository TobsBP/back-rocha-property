import { NotFoundError } from '@/core/errors/index.js';
import type { Product } from '@/infra/db/schema/products.js';
import type { IProductsRepository } from '../interfaces/products.repository.interface.js';
import type { IProductsService } from '../interfaces/products.service.interface.js';
import type {
	CreateProductBody,
	ListProductsQuery,
	UpdateProductBody,
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

	async list(query: ListProductsQuery) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const { data, total } = await this.repo.findAll(query);

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
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
