import { env } from '@/core/config/env.js';
import { ConflictError, UnauthorizedError } from '@/core/errors/index.js';
import type { IUsersService } from '@/modules/users/interfaces/users.service.interface.js';
import type { IAuthService } from '../interfaces/auth.service.interface.js';
import type { SignInBody, SignUpBody } from '../schemas/index.js';

const FIREBASE_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';

export class AuthService implements IAuthService {
	private usersService: IUsersService;
	constructor({ usersService }: { usersService: IUsersService }) {
		this.usersService = usersService;
	}

	async signIn(data: SignInBody): Promise<{ token: string }> {
		const response = await fetch(
			`${FIREBASE_BASE_URL}:signInWithPassword?key=${env.FIREBASE_API_KEY}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: data.email,
					password: data.password,
					returnSecureToken: true,
				}),
			},
		);

		if (!response.ok) {
			throw new UnauthorizedError('Invalid email or password');
		}

		const result = (await response.json()) as { idToken: string };

		return { token: result.idToken };
	}

	async signUp(data: SignUpBody): Promise<{ token: string }> {
		const response = await fetch(
			`${FIREBASE_BASE_URL}:signUp?key=${env.FIREBASE_API_KEY}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: data.email,
					password: data.password,
					returnSecureToken: true,
				}),
			},
		);

		if (!response.ok) {
			const error = (await response.json()) as { error?: { message?: string } };
			if (error?.error?.message === 'EMAIL_EXISTS') {
				throw new ConflictError('Email already in use');
			}
			throw new UnauthorizedError('Could not create account');
		}

		const result = (await response.json()) as { idToken: string };

		await this.usersService.create({
			email: data.email,
			name: data.name,
		});

		return { token: result.idToken };
	}
}
