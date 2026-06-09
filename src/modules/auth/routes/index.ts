import type { FastifyInstance } from 'fastify';
import { container } from '@/core/di/container.js';
import { ErrorResponseSchema } from '@/shared/schemas/common.js';
import type { AuthController } from '../controllers/auth.controller.js';
import {
	SignInBodySchema,
	SignInResponseSchema,
	SignUpBodySchema,
} from '../schemas/index.js';

export async function authRoutes(fastify: FastifyInstance) {
	const controller = container.resolve<AuthController>('authController');

	fastify.post(
		'/sign-in',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Auth'],
				summary: 'Sign in with email and password',
				body: SignInBodySchema,
				response: {
					200: SignInResponseSchema,
					401: ErrorResponseSchema,
				},
			},
		},
		controller.signIn,
	);

	fastify.post(
		'/sign-up',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Auth'],
				summary: 'Create account and return token',
				body: SignUpBodySchema,
				response: {
					201: SignInResponseSchema,
					409: ErrorResponseSchema,
				},
			},
		},
		controller.signUp,
	);
}
