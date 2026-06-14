import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from "vitest";
import Fastify, { type FastifyInstance } from "fastify";
import { GalleryController } from "../controllers/gallery.controller.js";
import type { IGalleryService } from "../interfaces/gallery.service.interface.js";

describe("Gallery Routes", () => {
    let fastify: FastifyInstance;
    let mockService: {
        getById: Mock;
        create: Mock;
    };

    beforeEach(async () => {
        fastify = Fastify();
        mockService = {
            getById: vi.fn(),
            create: vi.fn(),
        };

        const controller = new GalleryController({ galleryService: mockService as unknown as IGalleryService });

        fastify.get("/gallery/:id", controller.getById);
        fastify.post("/gallery", controller.create);

        await fastify.ready();
    });

    afterEach(async () => {
        await fastify.close();
    });

    it("GET /gallery/:id should return item", async () => {
        const item = { id: "123", name: "Test" };
        mockService.getById.mockResolvedValue(item);

        const response = await fastify.inject({
            method: "GET",
            url: "/gallery/123",
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(item);
    });
});
