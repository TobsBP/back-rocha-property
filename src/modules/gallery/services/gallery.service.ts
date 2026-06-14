import { NotFoundError } from "../../../core/errors/index.js";
import type { IGalleryRepository } from "../interfaces/gallery.repository.interface.js";
import type { IGalleryService } from "../interfaces/gallery.service.interface.js";
import type { CreateGalleryBody, GalleryDto } from "../schemas/index.js";

export class GalleryService implements IGalleryService {
    private repo: IGalleryRepository;
    constructor({ galleryRepository }: { galleryRepository: IGalleryRepository }) {
        this.repo = galleryRepository;
    }

    async getById(id: string): Promise<GalleryDto> {
        const item = await this.repo.findById(id);
        if (!item) throw new NotFoundError("Gallery", id);
        return item;
    }

    async create(data: CreateGalleryBody): Promise<GalleryDto> {
        return this.repo.create(data);
    }
}
