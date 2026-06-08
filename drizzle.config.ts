import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/infra/db/schema/index.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL ?? '',
	},
	verbose: true,
	strict: true,
});

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}
