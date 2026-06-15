import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ILeadsService } from '../interfaces/leads.service.interface.js';
import type {
	CreateLeadBody,
	LeadParams,
	ListLeadsQuery,
} from '../schemas/index.js';

export class LeadsController {
	private service: ILeadsService;
	constructor({ leadsService }: { leadsService: ILeadsService }) {
		this.service = leadsService;
	}

	list = async (
		request: FastifyRequest<{ Querystring: ListLeadsQuery }>,
		reply: FastifyReply,
	) => {
		const { page = 1, limit = 20 } = request.query;
		const { rows, total } = await this.service.list(page, limit);

		return reply.send({
			data: rows,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		});
	};

	getById = async (
		request: FastifyRequest<{ Params: LeadParams }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.getById(request.params.id);
		return reply.send(result);
	};

	create = async (
		request: FastifyRequest<{ Body: CreateLeadBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.create(request.body);
		return reply.status(201).send(result);
	};

	delete = async (
		request: FastifyRequest<{ Params: LeadParams }>,
		reply: FastifyReply,
	) => {
		await this.service.delete(request.params.id);
		return reply.status(204).send();
	};
}
