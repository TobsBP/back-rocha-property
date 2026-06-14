import type { Db } from "../../../infra/db/client.js";
import type { CreateGalleryBody, GalleryDto } from "../schemas/index.js";
import type { IGalleryRepository } from "../interfaces/gallery.repository.interface.js";

export class GalleryRepository implements IGalleryRepository {
    private db: Db;
    constructor({ db }: { db: Db }) {
        this.db = db;
    }

    async findById(_id: string): Promise<GalleryDto | null> {
        // Implement database search here
        return null; 
    }

    async create(_data: CreateGalleryBody): Promise<GalleryDto> {
        // Implement database insertion here
        return {} as GalleryDto;
    }
}
