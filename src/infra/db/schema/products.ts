import {
	decimal,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { categories } from './categories.js';

export const products = pgTable('products', {
	id: uuid('id').primaryKey().defaultRandom(),
	categoryId: uuid('category_id').references(() => categories.id),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	basePrice: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
	imageUrl: text('image_url'),
	active: integer('active').notNull().default(1),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
