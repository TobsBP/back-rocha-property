import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from '../../../core/di/container.js';
import { requireAdmin } from '../../../shared/hooks/require-admin.hook.js';
import type { GallerySalesController } from '../controllers/gallery-sales.controller.js';
import {
	CreateGallerySaleBodySchema,
	DeleteGallerySaleBodySchema,
	GallerySaleParamsSchema,
	GallerySaleSchema,
	ListGallerySalesQuerySchema,
	PaginatedGallerySalesSchema,
	UpdateGallerySaleBodySchema,
	UploadGallerySaleImagesResponseSchema,
} from '../schemas/gallery-sales.js';

export const gallerySalesRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
	const controller = container.resolve<GallerySalesController>('gallerySalesController');

	fastify.get(
		'/',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Gallery Sales'],
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
				tags: ['Gallery Sales'],
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
				tags: ['Gallery Sales'],
				summary: 'Upload gallery sale image',
				consumes: ['multipart/form-data'],
				response: { 201: UploadGallerySaleImagesResponseSchema },
			},
		},
		controller.uploadImg,
	);

	fastify.post(
		'/',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Gallery Sales'],
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
				tags: ['Gallery Sales'],
				params: GallerySaleParamsSchema,
				body: UpdateGallerySaleBodySchema,
				response: { 200: GallerySaleSchema },
			},
		},
		controller.update,
	);

	fastify.delete(
		'/',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Gallery Sales'],
				body: DeleteGallerySaleBodySchema,
				response: { 204: { type: 'null' } },
			},
		},
		controller.delete,
	);
}
