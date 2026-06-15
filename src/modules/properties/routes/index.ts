import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from '@/core/di/container.js';
import { requireAdmin } from '@/shared/hooks/require-admin.hook.js';
import type { PropertiesController } from '../controllers/properties.controller.js';
import {
	CreatePropertyBodySchema,
	DeletePropertyBodySchema,
	ListPropertiesQuerySchema,
	PaginatedAdminPropertiesSchema,
	PaginatedPropertiesSchema,
	PropertyParamsSchema,
	PropertySchema,
	UpdatePropertyBodySchema,
	UploadImageResponseSchema,
} from '../schemas/index.js';

export const propertiesRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
	const controller = container.resolve<PropertiesController>(
		'propertiesController',
	);

	fastify.get(
		'',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Properties'],
				summary: 'List properties',
				querystring: ListPropertiesQuerySchema,
				response: { 200: PaginatedPropertiesSchema },
			},
		},
		controller.list,
	);

	fastify.get(
		'/admin/summary',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Properties'],
				summary: 'List properties for admin (name, location, status, price)',
				querystring: ListPropertiesQuerySchema,
				response: { 200: PaginatedAdminPropertiesSchema },
			},
		},
		controller.listAdmin,
	);

	fastify.get(
		'/:id',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Properties'],
				summary: 'Get property by ID',
				params: PropertyParamsSchema,
				response: { 200: PropertySchema },
			},
		},
		controller.getById,
	);

	fastify.post(
		'',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Properties'],
				summary: 'Create property',
				body: CreatePropertyBodySchema,
				response: { 201: PropertySchema },
			},
		},
		controller.create,
	);

	fastify.post(
		'/img',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Properties'],
				summary: 'Upload property image',
				consumes: ['multipart/form-data'],
				response: { 201: UploadImageResponseSchema },
			},
		},
		controller.uploadImage,
	);

	fastify.patch(
		'/:id',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Properties'],
				summary: 'Update property',
				params: PropertyParamsSchema,
				body: UpdatePropertyBodySchema,
				response: { 200: PropertySchema },
			},
		},
		controller.update,
	);

	fastify.delete(
		'',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Properties'],
				summary: 'Delete property',
				body: DeletePropertyBodySchema,
				response: { 204: { type: 'null' } },
			},
		},
		controller.delete,
	);
};
