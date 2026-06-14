import type { FastifyRequest, FastifyReply } from "fastify";
import type { IGalleryService } from "../interfaces/gallery.service.interface.js";
import type { CreateGalleryBody, GalleryParams } from "../schemas/index.js";

export class GalleryController {
    private service: IGalleryService;
    constructor({ galleryService }: { galleryService: IGalleryService }) {
        this.service = galleryService;
    }

    getById = async (request: FastifyRequest<{ Params: GalleryParams }>, reply: FastifyReply) => {
        const result = await this.service.getById(request.params.id);
        return reply.send(result);
    };

    create = async (request: FastifyRequest<{ Body: CreateGalleryBody }>, reply: FastifyReply) => {
        const result = await this.service.create(request.body);
        return reply.status(201).send(result);
    };
}
