import type { FastifyReply, FastifyRequest } from 'fastify';
import { uploadImage } from '../../../shared/cloudinary.js';
import type { IGallerySalesService } from '../interfaces/gallery-sales.service.interface.js';
import type {
	CreateGallerySaleBody,
	GallerySaleParams,
	ListGallerySalesQuery,
	UpdateGallerySaleBody,
} from '../schemas/gallery-sales.js';

export class GallerySalesController {
	private service: IGallerySalesService;
	constructor({ gallerySalesService }: { gallerySalesService: IGallerySalesService }) {
		this.service = gallerySalesService;
	}

	list = async (
		request: FastifyRequest<{ Querystring: ListGallerySalesQuery }>,
		reply: FastifyReply,
	) => {
		const { data, total, page, limit, totalPages } = await this.service.list(request.query);
		return reply.send({ data, meta: { total, page, limit, totalPages } });
	};

	getById = async (
		request: FastifyRequest<{ Params: GallerySaleParams }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.getById(request.params.id);
		return reply.send(result);
	};

	create = async (
		request: FastifyRequest<{ Body: CreateGallerySaleBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.create(request.body);
		return reply.status(201).send(result);
	};

	update = async (
		request: FastifyRequest<{ Params: GallerySaleParams; Body: UpdateGallerySaleBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.update(request.params.id, request.body);
		return reply.send(result);
	};

	delete = async (
		request: FastifyRequest<{ Params: GallerySaleParams }>,
		reply: FastifyReply,
	) => {
		await this.service.delete(request.params.id);
		return reply.status(204).send();
	};

	uploadImg = async (request: FastifyRequest, reply: FastifyReply) => {
		const data = await request.file();
		if (!data) return reply.status(400).send({ message: 'No file provided' });

		const buffer = await data.toBuffer();
		const url = await uploadImage(buffer);

		return reply.status(201).send({ url });
	};
}
