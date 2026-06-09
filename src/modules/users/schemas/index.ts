import { type Static, Type } from '@sinclair/typebox';
import {
	PaginatedResponse,
	PaginationQuerySchema,
	UuidSchema,
} from '@/shared/schemas/common.js';

export const UserRoleSchema = Type.Union([
	Type.Literal('admin'),
	Type.Literal('user'),
]);

export const UserSchema = Type.Object({
	id: UuidSchema,
	email: Type.String({ format: 'email' }),
	name: Type.String(),
	role: UserRoleSchema,
	createdAt: Type.String({ format: 'date-time' }),
	updatedAt: Type.String({ format: 'date-time' }),
});

export const CreateUserBodySchema = Type.Object({
	email: Type.String({ format: 'email' }),
	name: Type.String({ minLength: 2, maxLength: 255 }),
	role: Type.Optional(UserRoleSchema),
});

export const UpdateUserBodySchema = Type.Partial(
	Type.Object({
		name: Type.String({ minLength: 2, maxLength: 255 }),
		role: UserRoleSchema,
	}),
);

export const UserParamsSchema = Type.Object({
	id: UuidSchema,
});

export const ListUsersQuerySchema = PaginationQuerySchema;
export const PaginatedUsersSchema = PaginatedResponse(UserSchema);

export type UserRole = Static<typeof UserRoleSchema>;
export type UserDto = Static<typeof UserSchema>;
export type CreateUserBody = Static<typeof CreateUserBodySchema>;
export type UpdateUserBody = Static<typeof UpdateUserBodySchema>;
export type UserParams = Static<typeof UserParamsSchema>;
export type ListUsersQuery = Static<typeof ListUsersQuerySchema>;
