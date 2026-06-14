import { NotFoundError } from '../../../core/errors/index.js';
import type { IGallerySalesRepository } from '../interfaces/gallery-sales.repository.interface.js';
import type { IGallerySalesService } from '../interfaces/gallery-sales.service.interface.js';
import type {
	CreateGallerySaleBody,
	GallerySaleDto,
	ListGallerySalesQuery,
	UpdateGallerySaleBody,
} from '../schemas/gallery-sales.js';

export class GallerySalesService implements IGallerySalesService {
	private repo: IGallerySalesRepository;
	constructor({ gallerySalesRepository }: { gallerySalesRepository: IGallerySalesRepository }) {
		this.repo = gallerySalesRepository;
	}

	async getById(id: string): Promise<GallerySaleDto> {
		const item = await this.repo.findById(id);
		if (!item) throw new NotFoundError('GallerySale', id);
		return item;
	}

	async list(query: ListGallerySalesQuery) {
		const { page = 1, limit = 20 } = query;
		const { data, total } = await this.repo.findAll(query);
		return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
	}

	async create(data: CreateGallerySaleBody): Promise<GallerySaleDto> {
		return this.repo.create(data);
	}

	async update(id: string, data: UpdateGallerySaleBody): Promise<GallerySaleDto> {
		const item = await this.repo.update(id, data);
		if (!item) throw new NotFoundError('GallerySale', id);
		return item;
	}

	async delete(id: string): Promise<void> {
		const deleted = await this.repo.delete(id);
		if (!deleted) throw new NotFoundError('GallerySale', id);
	}
}
