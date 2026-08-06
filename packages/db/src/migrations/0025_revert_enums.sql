-- Custom SQL migration file, put your code below! --
ALTER TABLE "public"."documents_table"
DROP COLUMN IF EXISTS "template_type";
--> statement-breakpoint

DROP TYPE IF EXISTS "public"."template_type";
