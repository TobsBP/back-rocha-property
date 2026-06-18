import type { FastifyReply, FastifyRequest } from 'fastify';
import { listImages, uploadImage } from '@/shared/cloudinary.js';
import type { IPropertiesService } from '../interfaces/properties.service.interface.js';
import type {
	CreatePropertyBody,
	DeletePropertyBody,
	ListImagesQuery,
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

	listAdmin = async (
		request: FastifyRequest<{ Querystring: ListPropertiesQuery }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.listAdminSummary(request.query);
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

	delete = async (
		request: FastifyRequest<{ Body: DeletePropertyBody }>,
		reply: FastifyReply,
	) => {
		await this.service.delete(request.body.id);
		return reply.status(204).send();
	};

	listImages = async (
		request: FastifyRequest<{ Querystring: ListImagesQuery }>,
		reply: FastifyReply,
	) => {
		const { maxResults, nextCursor } = request.query;
		const result = await listImages(maxResults, nextCursor);
		return reply.send(result);
	};

	uploadImage = async (request: FastifyRequest, reply: FastifyReply) => {
		const buffers: Buffer[] = [];
		for await (const part of request.files()) {
			buffers.push(await part.toBuffer());
		}

		if (buffers.length === 0) {
			return reply.status(400).send({ message: 'No file provided' });
		}

		const urls = await Promise.all(
			buffers.map((buffer) => uploadImage(buffer)),
		);

		return reply.status(201).send({ urls });
	};
}
