ALTER TABLE "organizations_table"
ADD COLUMN IF NOT EXISTS "template_type"
"public"."template_type"
DEFAULT 'APARTMENT'
NOT NULL;
--> statement-breakpoint

ALTER TABLE "documents_table"
DROP COLUMN IF EXISTS "template_type";
