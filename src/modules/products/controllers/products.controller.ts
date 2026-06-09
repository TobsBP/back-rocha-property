import type { FastifyReply, FastifyRequest } from 'fastify';
import { uploadImage } from '@/shared/cloudinary.js';
import type { IProductsService } from '../interfaces/products.service.interface.js';
import type {
	CreateProductBody,
	ListProductsQuery,
	ProductParams,
	UpdateProductBody,
} from '../schemas/index.js';

export class ProductsController {
	private service: IProductsService;
	constructor({ productsService }: { productsService: IProductsService }) {
		this.service = productsService;
	}

	getById = async (
		request: FastifyRequest<{ Params: ProductParams }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.getById(request.params.id);
		return reply.send(result);
	};

	list = async (
		request: FastifyRequest<{ Querystring: ListProductsQuery }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.list(request.query);
		return reply.send(result);
	};

	create = async (
		request: FastifyRequest<{ Body: CreateProductBody }>,
		reply: FastifyReply,
	) => {
		const result = await this.service.create(request.body);
		return reply.status(201).send(result);
	};

	update = async (
		request: FastifyRequest<{ Params: ProductParams; Body: UpdateProductBody }>,
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
