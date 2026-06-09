import { type Static, Type } from '@sinclair/typebox';
import {
	PaginatedResponse,
	PaginationQuerySchema,
	UuidSchema,
} from '@/shared/schemas/common.js';

export const ProductSchema = Type.Object({
	id: UuidSchema,
	categoryId: Type.Optional(UuidSchema),
	name: Type.String(),
	description: Type.Optional(Type.String()),
	basePrice: Type.String(), // Decimal as string for precision in JSON
	imageUrl: Type.Optional(Type.String()),
	active: Type.Integer(),
	createdAt: Type.String({ format: 'date-time' }),
	updatedAt: Type.String({ format: 'date-time' }),
});

export const CreateProductBodySchema = Type.Object({
	categoryId: Type.Optional(UuidSchema),
	name: Type.String(),
	description: Type.Optional(Type.String()),
	basePrice: Type.String(),
	imageUrl: Type.Optional(Type.String()),
	active: Type.Optional(Type.Integer({ default: 1 })),
});

export const UpdateProductBodySchema = Type.Partial(CreateProductBodySchema);

export const ProductParamsSchema = Type.Object({
	id: UuidSchema,
});

export const ListProductsQuerySchema = PaginationQuerySchema;
export const PaginatedProductsSchema = PaginatedResponse(ProductSchema);

export const UploadImageResponseSchema = Type.Object({
	url: Type.String({ format: 'uri' }),
});

export type ProductDto = Static<typeof ProductSchema>;
export type CreateProductBody = Static<typeof CreateProductBodySchema>;
export type UpdateProductBody = Static<typeof UpdateProductBodySchema>;
export type ProductParams = Static<typeof ProductParamsSchema>;
export type ListProductsQuery = Static<typeof ListProductsQuerySchema>;
export type UploadImageResponse = Static<typeof UploadImageResponseSchema>;
