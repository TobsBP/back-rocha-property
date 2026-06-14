import type { CreateGalleryBody, GalleryDto } from "../schemas/index.js";

export interface IGalleryRepository {
    findById(id: string): Promise<GalleryDto | null>;
    create(data: CreateGalleryBody): Promise<GalleryDto>;
}
