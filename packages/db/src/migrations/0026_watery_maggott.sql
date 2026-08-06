DO $$
BEGIN
    CREATE TYPE "public"."template_type" AS ENUM ('HOTEL', 'APARTMENT');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;
--> statement-breakpoint

ALTER TABLE "public"."organizations_table"
ADD COLUMN IF NOT EXISTS "template_type"
"public"."template_type"
DEFAULT 'APARTMENT'
NOT NULL;
--> statement-breakpoint

ALTER TABLE "public"."documents_table"
DROP COLUMN IF EXISTS "template_type";
