CREATE TYPE "public"."template_type" AS ENUM('HOTEL', 'APARTMENT');--> statement-breakpoint
ALTER TABLE "documents_table" ADD COLUMN "template_type" "template_type" DEFAULT 'APARTMENT' NOT NULL;