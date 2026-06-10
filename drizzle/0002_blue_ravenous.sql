CREATE TYPE "public"."property_purpose" AS ENUM('venda', 'aluguel');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('active', 'pending', 'draft', 'sold');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('casa', 'apartamento', 'terreno', 'cobertura', 'loft', 'comercial');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(12, 2) NOT NULL,
	"condo_fee" numeric(10, 2),
	"type" "property_type" NOT NULL,
	"purpose" "property_purpose" DEFAULT 'venda' NOT NULL,
	"status" "property_status" DEFAULT 'draft' NOT NULL,
	"area" integer NOT NULL,
	"bedrooms" integer DEFAULT 0 NOT NULL,
	"suites" integer DEFAULT 0 NOT NULL,
	"bathrooms" integer DEFAULT 0 NOT NULL,
	"parking_spaces" integer DEFAULT 0 NOT NULL,
	"is_exclusive" boolean DEFAULT false NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"address_street" varchar(255),
	"neighborhood" varchar(120),
	"city" varchar(120) NOT NULL,
	"state" varchar(2) NOT NULL,
	"image_url" text,
	"broker_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "categories" CASCADE;--> statement-breakpoint
DROP TABLE "order_items" CASCADE;--> statement-breakpoint
DROP TABLE "orders" CASCADE;--> statement-breakpoint
DROP TABLE "product_variants" CASCADE;--> statement-breakpoint
DROP TABLE "products" CASCADE;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_broker_id_users_id_fk" FOREIGN KEY ("broker_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."order_status";