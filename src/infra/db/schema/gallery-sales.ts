import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const gallerySales = pgTable('gallery_sales', {
	id: uuid('id').primaryKey().defaultRandom(),
	soldAt: timestamp('sold_at').notNull(),
	description: text('description').notNull(),
	imgUrl: text('img_url').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type GallerySale = typeof gallerySales.$inferSelect;
export type NewGallerySale = typeof gallerySales.$inferInsert;
