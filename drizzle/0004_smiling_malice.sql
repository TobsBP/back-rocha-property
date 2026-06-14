ALTER TABLE "gallery_sales" ADD COLUMN "img_urls" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "gallery_sales" DROP COLUMN "img_url";