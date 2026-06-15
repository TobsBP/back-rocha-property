import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from '../../../core/di/container.js';
import { requireAdmin } from '../../../shared/hooks/require-admin.hook.js';
import type { GalleryController } from '../controllers/gallery.controller.js';
import {
	CreateGallerySaleBodySchema,
	DeleteGallerySaleBodySchema,
	GallerySaleParamsSchema,
	GallerySaleSchema,
	ListGallerySalesQuerySchema,
	PaginatedGallerySalesSchema,
	UpdateGallerySaleBodySchema,
	UploadGallerySaleImagesResponseSchema,
} from '../schemas/index.js';

export const galleryRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
	const controller = container.resolve<GalleryController>('galleryController');

	fastify.get(
		'',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Gallery'],
				querystring: ListGallerySalesQuerySchema,
				response: { 200: PaginatedGallerySalesSchema },
			},
		},
		controller.list,
	);

	fastify.get(
		'/:id',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Gallery'],
				params: GallerySaleParamsSchema,
				response: { 200: GallerySaleSchema },
			},
		},
		controller.getById,
	);

	fastify.post(
		'/img',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Gallery'],
				summary: 'Upload gallery images',
				consumes: ['multipart/form-data'],
				response: { 201: UploadGallerySaleImagesResponseSchema },
			},
		},
		controller.uploadImg,
	);

	fastify.post(
		'',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Gallery'],
				body: CreateGallerySaleBodySchema,
				response: { 201: GallerySaleSchema },
			},
		},
		controller.create,
	);

	fastify.patch(
		'/:id',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Gallery'],
				params: GallerySaleParamsSchema,
				body: UpdateGallerySaleBodySchema,
				response: { 200: GallerySaleSchema },
			},
		},
		controller.update,
	);

	fastify.delete(
		'',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Gallery'],
				body: DeleteGallerySaleBodySchema,
				response: { 204: { type: 'null' } },
			},
		},
		controller.delete,
	);
};
