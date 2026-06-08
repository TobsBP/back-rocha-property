import { decimal, integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders.js';
import { productVariants } from './product-variants.js';

export const orderItems = pgTable('order_items', {
	id: uuid('id').primaryKey().defaultRandom(),
	orderId: uuid('order_id')
		.notNull()
		.references(() => orders.id),
	productVariantId: uuid('product_variant_id')
		.notNull()
		.references(() => productVariants.id),
	quantity: integer('quantity').notNull(),
	price: decimal('price', { precision: 10, scale: 2 }).notNull(), // Price at the time of purchase
});

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
