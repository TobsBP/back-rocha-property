import type { FastifyReply, FastifyRequest } from 'fastify';
import type { IAuthService } from '../interfaces/auth.service.interface.js';
import type { SignInBody, SignUpBody } from '../schemas/index.js';

export class AuthController {
	private service: IAuthService;
	constructor({ authService }: { authService: IAuthService }) {
		this.service = authService;
	}

	signIn = async (
		request: FastifyRequest<{ Body: SignInBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.signIn(request.body);
		return reply.status(200).send(result);
	};

	signUp = async (
		request: FastifyRequest<{ Body: SignUpBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.signUp(request.body);
		return reply.status(201).send(result);
	};
}
