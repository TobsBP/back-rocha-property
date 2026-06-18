ALTER TABLE "properties" ADD COLUMN "image_urls" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "image_url";