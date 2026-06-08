import {
	decimal,
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { products } from './products.js';

export const productVariants = pgTable('product_variants', {
	id: uuid('id').primaryKey().defaultRandom(),
	productId: uuid('product_id')
		.notNull()
		.references(() => products.id),
	name: varchar('name', { length: 255 }).notNull(), // e.g., "Grey / Medium"
	sku: varchar('sku', { length: 100 }).unique(),
	price: decimal('price', { precision: 10, scale: 2 }), // overrides basePrice if set
	stock: integer('stock').notNull().default(0),
	active: integer('active').notNull().default(1),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
