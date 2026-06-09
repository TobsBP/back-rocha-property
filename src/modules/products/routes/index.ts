import type { FastifyInstance } from 'fastify';
import { container } from '@/core/di/container.js';
import { requireAdmin } from '@/shared/hooks/require-admin.hook.js';
import type { ProductsController } from '../controllers/products.controller.js';
import {
	CreateProductBodySchema,
	ListProductsQuerySchema,
	PaginatedProductsSchema,
	ProductParamsSchema,
	ProductSchema,
	UpdateProductBodySchema,
	UploadImageResponseSchema,
	type CreateProductBody,
	type ProductParams,
	type UpdateProductBody,
} from '../schemas/index.js';

export async function productsRoutes(fastify: FastifyInstance) {
	const controller =
		container.resolve<ProductsController>('productsController');

	fastify.get(
		'',
		{
			schema: {
				tags: ['Products'],
				summary: 'List products',
				querystring: ListProductsQuerySchema,
				response: { 200: PaginatedProductsSchema },
			},
		},
		controller.list,
	);

	fastify.get(
		'/:id',
		{
			schema: {
				tags: ['Products'],
				summary: 'Get product by ID',
				params: ProductParamsSchema,
				response: { 200: ProductSchema },
			},
		},
		controller.getById,
	);

	fastify.post<{ Body: CreateProductBody }>(
		'',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Products'],
				summary: 'Create product',
				body: CreateProductBodySchema,
				response: { 201: ProductSchema },
			},
		},
		controller.create,
	);

	fastify.post(
		'/img',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Products'],
				summary: 'Upload product image',
				consumes: ['multipart/form-data'],
				response: { 201: UploadImageResponseSchema },
			},
		},
		controller.uploadImage,
	);

	fastify.patch<{ Params: ProductParams; Body: UpdateProductBody }>(
		'/:id',
		{
			preHandler: requireAdmin,
			schema: {
				tags: ['Products'],
				summary: 'Update product',
				params: ProductParamsSchema,
				body: UpdateProductBodySchema,
				response: { 200: ProductSchema },
			},
		},
		controller.update,
	);
}
