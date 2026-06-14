import type { CreateGalleryBody, GalleryDto } from "../schemas/index.js";

export interface IGalleryService {
    getById(id: string): Promise<GalleryDto>;
    create(data: CreateGalleryBody): Promise<GalleryDto>;
}
