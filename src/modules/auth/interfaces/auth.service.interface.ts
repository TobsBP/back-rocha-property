import type { SignInBody, SignUpBody } from '../schemas/index.js';

export interface IAuthService {
	signIn(data: SignInBody): Promise<{ token: string }>;
	signUp(data: SignUpBody): Promise<{ token: string }>;
}
