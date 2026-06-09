import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UnauthorizedError } from '@/core/errors/index.js';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		const mockUsersService = { create: vi.fn() } as never;
		service = new AuthService({ usersService: mockUsersService });
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return token on successful sign in', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({ idToken: 'firebase-token-123' }),
			}),
		);

		const result = await service.signIn({
			email: 'test@test.com',
			password: '123456',
		});

		expect(result).toEqual({ token: 'firebase-token-123' });
	});

	it('should throw UnauthorizedError on invalid credentials', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: false,
				json: async () => ({ error: { message: 'INVALID_PASSWORD' } }),
			}),
		);

		await expect(
			service.signIn({ email: 'test@test.com', password: 'wrong' }),
		).rejects.toThrow(UnauthorizedError);
	});
});
