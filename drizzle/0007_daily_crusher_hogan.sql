ALTER TABLE "properties" DROP CONSTRAINT "properties_broker_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "broker_id";