import { Static, Type } from '@sinclair/typebox';
import { PaginatedResponse, PaginationQuerySchema, UuidSchema } from '../../../shared/schemas/common.js';

export const GallerySaleSchema = Type.Object({
	id: UuidSchema,
	soldAt: Type.String({ format: 'date-time' }),
	description: Type.String(),
	imgUrl: Type.String(),
	createdAt: Type.String({ format: 'date-time' }),
	updatedAt: Type.String({ format: 'date-time' }),
});

export const CreateGallerySaleBodySchema = Type.Object({
	soldAt: Type.String({ format: 'date-time' }),
	description: Type.String({ minLength: 1 }),
	imgUrl: Type.String({ format: 'uri' }),
});

export const UpdateGallerySaleBodySchema = Type.Partial(CreateGallerySaleBodySchema);

export const GallerySaleParamsSchema = Type.Object({
	id: UuidSchema,
});

export const ListGallerySalesQuerySchema = PaginationQuerySchema;
export const PaginatedGallerySalesSchema = PaginatedResponse(GallerySaleSchema);

export type GallerySaleDto = Static<typeof GallerySaleSchema>;
export type CreateGallerySaleBody = Static<typeof CreateGallerySaleBodySchema>;
export type UpdateGallerySaleBody = Static<typeof UpdateGallerySaleBodySchema>;
export type GallerySaleParams = Static<typeof GallerySaleParamsSchema>;
export type ListGallerySalesQuery = Static<typeof ListGallerySalesQuerySchema>;
