import type { FastifyReply, FastifyRequest } from 'fastify';
import { uploadImage } from '../../../shared/cloudinary.js';
import type { IGalleryService } from '../interfaces/gallery.service.interface.js';
import type {
  CreateGallerySaleBody,
  DeleteGallerySaleBody,
  GallerySaleParams,
  ListGallerySalesQuery,
  UpdateGallerySaleBody,
} from '../schemas/index.js';

export class GalleryController {
  private service: IGalleryService;
  constructor({ galleryService }: { galleryService: IGalleryService }) {
    this.service = galleryService;
  }

  getById = async (
    request: FastifyRequest<{ Params: GallerySaleParams }>,
    reply: FastifyReply,
  ) => {
    const result = await this.service.getById(request.params.id);
    return reply.send(result);
  };

  list = async (
    request: FastifyRequest<{ Querystring: ListGallerySalesQuery }>,
    reply: FastifyReply,
  ) => {
    const { data, total, page, limit, totalPages } = await this.service.list(request.query);

    return reply.send({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  };

  create = async (
    request: FastifyRequest<{ Body: CreateGallerySaleBody }>,
    reply: FastifyReply,
  ) => {
    const result = await this.service.create(request.body);
    return reply.status(201).send(result);
  };

  update = async (
    request: FastifyRequest<{
      Params: GallerySaleParams;
      Body: UpdateGallerySaleBody;
    }>,
    reply: FastifyReply,
  ) => {
    const result = await this.service.update(request.params.id, request.body);
    return reply.send(result);
  };

  delete = async (
    request: FastifyRequest<{ Body: DeleteGallerySaleBody }>,
    reply: FastifyReply,
  ) => {
    await this.service.delete(request.body.id);
    return reply.status(204).send();
  };

  uploadImg = async (request: FastifyRequest, reply: FastifyReply) => {
    const parts = request.files();
    const urls: string[] = [];

    for await (const part of parts) {
      if (part.type === 'file') {
        const buffer = await part.toBuffer();
        const url = await uploadImage(buffer);
        urls.push(url);
      }
    }

    if (urls.length === 0) {
      return reply.status(400).send({ message: 'No images provided' });
    }

    return reply.status(201).send({ urls });
  };
}
