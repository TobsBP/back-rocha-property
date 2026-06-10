import {
	boolean,
	decimal,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const propertyTypeEnum = pgEnum('property_type', [
	'casa',
	'apartamento',
	'terreno',
	'cobertura',
	'loft',
	'comercial',
]);

export const propertyPurposeEnum = pgEnum('property_purpose', [
	'venda',
	'aluguel',
]);

export const propertyStatusEnum = pgEnum('property_status', [
	'active',
	'pending',
	'draft',
	'sold',
]);

export const properties = pgTable('properties', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	price: decimal('price', { precision: 12, scale: 2 }).notNull(),
	condoFee: decimal('condo_fee', { precision: 10, scale: 2 }),
	type: propertyTypeEnum('type').notNull(),
	purpose: propertyPurposeEnum('purpose').notNull().default('venda'),
	status: propertyStatusEnum('status').notNull().default('draft'),
	area: integer('area').notNull(), // m²
	bedrooms: integer('bedrooms').notNull().default(0),
	suites: integer('suites').notNull().default(0),
	bathrooms: integer('bathrooms').notNull().default(0),
	parkingSpaces: integer('parking_spaces').notNull().default(0),
	isExclusive: boolean('is_exclusive').notNull().default(false),
	isNew: boolean('is_new').notNull().default(false),
	addressStreet: varchar('address_street', { length: 255 }),
	neighborhood: varchar('neighborhood', { length: 120 }),
	city: varchar('city', { length: 120 }).notNull(),
	state: varchar('state', { length: 2 }).notNull(),
	imageUrl: text('image_url'),
	brokerId: uuid('broker_id').references(() => users.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
