import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from '../../../core/di/container.js';
import { requireAdmin } from '../../../shared/hooks/require-admin.hook.js';
import type { LeadsController } from '../controllers/leads.controller.js';
import {
	CreateLeadBodySchema,
	LeadParamsSchema,
	LeadSchema,
	ListLeadsQuerySchema,
	PaginatedLeadsSchema,
} from '../schemas/index.js';

export const leadsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
	const controller = container.resolve<LeadsController>('leadsController');

	fastify.get(
		'',
		{
			schema: {
				tags: ['Leads'],
				querystring: ListLeadsQuerySchema,
				response: { 200: PaginatedLeadsSchema },
				security: [{ bearerAuth: [] }],
			},
			preHandler: [requireAdmin],
		},
		controller.list,
	);

	fastify.get(
		'/:id',
		{
			schema: {
				tags: ['Leads'],
				params: LeadParamsSchema,
				response: { 200: LeadSchema },
				security: [{ bearerAuth: [] }],
			},
			preHandler: [requireAdmin],
		},
		controller.getById,
	);

	fastify.post(
		'',
		{
			config: { isPublic: true },
			schema: {
				tags: ['Leads'],
				body: CreateLeadBodySchema,
				response: { 201: LeadSchema },
			},
		},
		controller.create,
	);

	fastify.delete(
		'/:id',
		{
			schema: {
				tags: ['Leads'],
				params: LeadParamsSchema,
				response: { 204: { type: 'null' } },
				security: [{ bearerAuth: [] }],
			},
			preHandler: [requireAdmin],
		},
		controller.delete,
	);
};
