import type { FastifyInstance } from 'fastify';
import { container } from '../../../core/di/container.js';
import type { ProductsController } from '../controllers/products.controller.js';
import {
	CreateProductBodySchema,
	ListProductsQuerySchema,
	PaginatedProductsSchema,
	ProductParamsSchema,
	ProductSchema,
	UpdateProductBodySchema,
} from '../schemas/index.js';

export async function productsRoutes(fastify: FastifyInstance) {
	const controller =
		container.resolve<ProductsController>('productsController');

	fastify.get(
		'/',
		{
			schema: {
				tags: ['Products'],
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
				params: ProductParamsSchema,
				response: { 200: ProductSchema },
			},
		},
		controller.getById,
	);

	fastify.post(
		'/',
		{
			schema: {
				tags: ['Products'],
				body: CreateProductBodySchema,
				response: { 201: ProductSchema },
			},
		},
		controller.create,
	);

	fastify.patch(
		'/:id',
		{
			schema: {
				tags: ['Products'],
				params: ProductParamsSchema,
				body: UpdateProductBodySchema,
				response: { 200: ProductSchema },
			},
		},
		controller.update,
	);
}
