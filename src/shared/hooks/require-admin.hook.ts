import type { FastifyReply, FastifyRequest } from 'fastify';
import { ForbiddenError } from '@/core/errors/index.js';

export async function requireAdmin(
	request: FastifyRequest,
	_reply: FastifyReply,
) {
	if (request.authUser.role !== 'admin') {
		throw new ForbiddenError('Admin access required');
	}
}
