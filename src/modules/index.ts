import type { FastifyInstance } from 'fastify';
import { authRoutes } from './auth/routes/index.js';
import { galleryRoutes } from './gallery/routes/index.js';
import { propertiesRoutes } from './properties/routes/index.js';
import { usersRoutes } from './users/routes/index.js';

export async function appModules(fastify: FastifyInstance) {
	await fastify.register(authRoutes, { prefix: '/auth' });
	await fastify.register(usersRoutes, { prefix: '/users' });
	await fastify.register(propertiesRoutes, { prefix: '/properties' });
	await fastify.register(galleryRoutes, { prefix: '/gallery' });
}
