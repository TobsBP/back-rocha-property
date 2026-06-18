import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { properties } from './properties.js';

export const leads = pgTable('leads', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 20 }).notNull(),
	message: text('message').notNull(),
	propertyId: uuid('property_id').references(() => properties.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
