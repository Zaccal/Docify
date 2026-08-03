ALTER TABLE "organizations_table" ADD COLUMN "template_type" "template_type" DEFAULT 'APARTMENT' NOT NULL;--> statement-breakpoint
ALTER TABLE "documents_table" DROP COLUMN "template_type";