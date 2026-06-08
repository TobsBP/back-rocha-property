import {
	decimal,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const orderStatusEnum = pgEnum('order_status', [
	'pending',
	'shipped',
	'delivered',
	'cancelled',
]);

export const orders = pgTable('orders', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	orderNumber: varchar('order_number', { length: 50 }).notNull().unique(), // e.g., ORD-2024-88A1
	total: decimal('total', { precision: 10, scale: 2 }).notNull(),
	status: orderStatusEnum('status').notNull().default('pending'),
	shippingAddress: text('shipping_address'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
