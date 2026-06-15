import { type Static, Type } from '@sinclair/typebox';
import {
	PaginatedResponse,
	PaginationQuerySchema,
	UuidSchema,
} from '@/shared/schemas/common.js';

export const PropertyTypeSchema = Type.Union([
	Type.Literal('casa'),
	Type.Literal('apartamento'),
	Type.Literal('terreno'),
	Type.Literal('cobertura'),
	Type.Literal('loft'),
	Type.Literal('comercial'),
]);

export const PropertyPurposeSchema = Type.Union([
	Type.Literal('venda'),
	Type.Literal('aluguel'),
]);

export const PropertyStatusSchema = Type.Union([
	Type.Literal('active'),
	Type.Literal('pending'),
	Type.Literal('draft'),
	Type.Literal('sold'),
]);

export const PropertySchema = Type.Object({
	id: UuidSchema,
	title: Type.String(),
	description: Type.Optional(Type.String()),
	price: Type.String(), // Decimal as string for precision in JSON
	condoFee: Type.Optional(Type.String()),
	type: PropertyTypeSchema,
	purpose: PropertyPurposeSchema,
	status: PropertyStatusSchema,
	area: Type.Integer(),
	bedrooms: Type.Integer(),
	suites: Type.Integer(),
	bathrooms: Type.Integer(),
	parkingSpaces: Type.Integer(),
	isExclusive: Type.Boolean(),
	isNew: Type.Boolean(),
	addressStreet: Type.Optional(Type.String()),
	neighborhood: Type.Optional(Type.String()),
	city: Type.String(),
	state: Type.String(),
	imageUrl: Type.Optional(Type.String()),
	brokerId: Type.Optional(UuidSchema),
	createdAt: Type.String({ format: 'date-time' }),
	updatedAt: Type.String({ format: 'date-time' }),
});

export const CreatePropertyBodySchema = Type.Object({
	title: Type.String(),
	description: Type.Optional(Type.String()),
	price: Type.String(),
	condoFee: Type.Optional(Type.String()),
	type: PropertyTypeSchema,
	purpose: Type.Optional(PropertyPurposeSchema),
	status: Type.Optional(PropertyStatusSchema),
	area: Type.Integer(),
	bedrooms: Type.Optional(Type.Integer({ default: 0 })),
	suites: Type.Optional(Type.Integer({ default: 0 })),
	bathrooms: Type.Optional(Type.Integer({ default: 0 })),
	parkingSpaces: Type.Optional(Type.Integer({ default: 0 })),
	isExclusive: Type.Optional(Type.Boolean({ default: false })),
	isNew: Type.Optional(Type.Boolean({ default: false })),
	addressStreet: Type.Optional(Type.String()),
	neighborhood: Type.Optional(Type.String()),
	city: Type.String(),
	state: Type.String({ minLength: 2, maxLength: 2 }),
	imageUrl: Type.Optional(Type.String()),
	brokerId: Type.Optional(UuidSchema),
});

export const UpdatePropertyBodySchema = Type.Partial(CreatePropertyBodySchema);

export const DeletePropertyBodySchema = Type.Object({
	id: UuidSchema,
});

export const PropertyParamsSchema = Type.Object({
	id: UuidSchema,
});

export const ListPropertiesQuerySchema = PaginationQuerySchema;
export const PaginatedPropertiesSchema = PaginatedResponse(PropertySchema);

export const AdminPropertySummarySchema = Type.Object({
	id: UuidSchema,
	name: Type.String(),
	location: Type.String(),
	status: PropertyStatusSchema,
	price: Type.String(),
});
export const PaginatedAdminPropertiesSchema = PaginatedResponse(
	AdminPropertySummarySchema,
);

export const UploadImageResponseSchema = Type.Object({
	url: Type.String({ format: 'uri' }),
});

export type PropertyDto = Static<typeof PropertySchema>;
export type CreatePropertyBody = Static<typeof CreatePropertyBodySchema>;
export type UpdatePropertyBody = Static<typeof UpdatePropertyBodySchema>;
export type DeletePropertyBody = Static<typeof DeletePropertyBodySchema>;
export type PropertyParams = Static<typeof PropertyParamsSchema>;
export type ListPropertiesQuery = Static<typeof ListPropertiesQuerySchema>;
export type UploadImageResponse = Static<typeof UploadImageResponseSchema>;
export type AdminPropertySummary = Static<typeof AdminPropertySummarySchema>;
