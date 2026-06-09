import { type Static, Type } from '@sinclair/typebox';

export const SignInBodySchema = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String({ minLength: 6 }),
});

export const SignUpBodySchema = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String({ minLength: 6 }),
	name: Type.String({ minLength: 2, maxLength: 255 }),
});

export const SignInResponseSchema = Type.Object({
	token: Type.String(),
});

export type SignInBody = Static<typeof SignInBodySchema>;
export type SignUpBody = Static<typeof SignUpBodySchema>;
