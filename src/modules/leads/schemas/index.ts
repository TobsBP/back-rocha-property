import { type Static, Type } from '@sinclair/typebox';
import {
	PaginatedResponse,
	PaginationQuerySchema,
	UuidSchema,
} from '../../../shared/schemas/common.js';

export const LeadSchema = Type.Object({
	id: UuidSchema,
	name: Type.String(),
	email: Type.String({ format: 'email' }),
	phone: Type.String(),
	message: Type.String(),
	propertyId: Type.Optional(UuidSchema),
	propertyName: Type.Optional(Type.String()),
	createdAt: Type.String({ format: 'date-time' }),
	updatedAt: Type.String({ format: 'date-time' }),
});

export const CreateLeadBodySchema = Type.Object({
	name: Type.String(),
	email: Type.String({ format: 'email' }),
	phone: Type.String(),
	message: Type.String(),
	propertyId: Type.Optional(UuidSchema),
});

export const UpdateLeadBodySchema = Type.Partial(CreateLeadBodySchema);

export const LeadParamsSchema = Type.Object({
	id: UuidSchema,
});

export const ListLeadsQuerySchema = PaginationQuerySchema;
export const PaginatedLeadsSchema = PaginatedResponse(LeadSchema);

export type LeadDto = Static<typeof LeadSchema>;
export type CreateLeadBody = Static<typeof CreateLeadBodySchema>;
export type UpdateLeadBody = Static<typeof UpdateLeadBodySchema>;
export type LeadParams = Static<typeof LeadParamsSchema>;
export type ListLeadsQuery = Static<typeof ListLeadsQuerySchema>;
