import type { FastifyInstance } from 'fastify';
import { authRoutes } from './auth/routes/index.js';
import { productsRoutes } from './products/routes/index.js';
import { usersRoutes } from './users/routes/index.js';

export async function appModules(fastify: FastifyInstance) {
	await fastify.register(authRoutes, { prefix: '/auth' });
	await fastify.register(usersRoutes, { prefix: '/users' });
	await fastify.register(productsRoutes, { prefix: '/products' });
}
