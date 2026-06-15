import { NotFoundError } from '../../../core/errors/index.js';
import type { IGalleryRepository } from '../interfaces/gallery.repository.interface.js';
import type { IGalleryService } from '../interfaces/gallery.service.interface.js';
import type {
	CreateGallerySaleBody,
	GallerySaleDto,
	ListGallerySalesQuery,
	UpdateGallerySaleBody,
} from '../schemas/index.js';

export class GalleryService implements IGalleryService {
	private repo: IGalleryRepository;
	constructor({
		galleryRepository,
	}: { galleryRepository: IGalleryRepository }) {
		this.repo = galleryRepository;
	}

	async getById(id: string): Promise<GallerySaleDto> {
		const item = await this.repo.findById(id);
		if (!item) throw new NotFoundError('GalleryItem', id);
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

	async update(
		id: string,
		data: UpdateGallerySaleBody,
	): Promise<GallerySaleDto> {
		const item = await this.repo.update(id, data);
		if (!item) throw new NotFoundError('GalleryItem', id);
		return item;
	}

	async delete(id: string): Promise<void> {
		const deleted = await this.repo.delete(id);
		if (!deleted) throw new NotFoundError('GalleryItem', id);
	}
}
