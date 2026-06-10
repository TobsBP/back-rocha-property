import type { FastifyReply, FastifyRequest } from 'fastify';
import { uploadImage } from '@/shared/cloudinary.js';
import type { IPropertiesService } from '../interfaces/properties.service.interface.js';
import type {
	CreatePropertyBody,
	ListPropertiesQuery,
	PropertyParams,
	UpdatePropertyBody,
} from '../schemas/index.js';

export class PropertiesController {
	private service: IPropertiesService;
	constructor({
		propertiesService,
	}: { propertiesService: IPropertiesService }) {
		this.service = propertiesService;
	}

	getById = async (
		request: FastifyRequest<{ Params: PropertyParams }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.getById(request.params.id);
		return reply.send(result);
	};

	list = async (
		request: FastifyRequest<{ Querystring: ListPropertiesQuery }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.list(request.query);
		return reply.send(result);
	};

	create = async (
		request: FastifyRequest<{ Body: CreatePropertyBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.create(request.body);
		return reply.status(201).send(result);
	};

	update = async (
		request: FastifyRequest<{
			Params: PropertyParams;
			Body: UpdatePropertyBody;
		}>,
		reply: FastifyReply,
	) => {
		const result = await this.service.update(request.params.id, request.body);
		return reply.send(result);
	};

	uploadImage = async (request: FastifyRequest, reply: FastifyReply) => {
		const data = await request.file();
		if (!data) {
			return reply.status(400).send({ message: 'No file provided' });
		}

		const buffer = await data.toBuffer();
		const url = await uploadImage(buffer);

		return reply.status(201).send({ url });
	};
}
