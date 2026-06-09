import Fastify, { type FastifyInstance } from 'fastify';
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	type Mock,
	vi,
} from 'vitest';
import { AuthController } from '../controllers/auth.controller.js';
import type { IAuthService } from '../interfaces/auth.service.interface.js';

describe('Auth Routes', () => {
	let fastify: FastifyInstance;
	let mockService: { signIn: Mock };

	beforeEach(async () => {
		fastify = Fastify();
		mockService = { signIn: vi.fn() };

		const controller = new AuthController({
			authService: mockService as unknown as IAuthService,
		});

		fastify.post('/auth/sign-in', controller.signIn);

		await fastify.ready();
	});

	afterEach(async () => {
		await fastify.close();
	});

	it('POST /auth/sign-in should return token', async () => {
		mockService.signIn.mockResolvedValue({ token: 'firebase-token-123' });

		const response = await fastify.inject({
			method: 'POST',
			url: '/auth/sign-in',
			payload: { email: 'test@test.com', password: '123456' },
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual({ token: 'firebase-token-123' });
	});
});
