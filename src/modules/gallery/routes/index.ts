import type { FastifyInstance } from "fastify";
import { container } from "../../../core/di/container.js";
import type { GalleryController } from "../controllers/gallery.controller.js";
import {
    GallerySchema,
    CreateGalleryBodySchema,
    GalleryParamsSchema,
} from "../schemas/index.js";

export async function galleryRoutes(fastify: FastifyInstance) {
    const controller = container.resolve<GalleryController>("galleryController");

    fastify.get(
        "/:id",
        {
            schema: {
                tags: ["Gallery"],
                params: GalleryParamsSchema,
                response: { 200: GallerySchema },
            },
        },
        controller.getById,
    );

    fastify.post(
        "/",
        {
            schema: {
                tags: ["Gallery"],
                body: CreateGalleryBodySchema,
                response: { 201: GallerySchema },
            },
        },
        controller.create,
    );
}
