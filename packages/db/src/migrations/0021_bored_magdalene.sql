ALTER TABLE "documents_table" DROP CONSTRAINT "documents_table_organization_id_organizations_table_id_fk";
--> statement-breakpoint
ALTER TABLE "documents_table" DROP CONSTRAINT "documents_table_customer_id_customers_table_id_fk";
--> statement-breakpoint
DROP INDEX "documents_table_organization_id_idx";--> statement-breakpoint
ALTER TABLE "documents_table" ADD CONSTRAINT "documents_table_customer_id_customers_table_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers_table"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_table" DROP COLUMN "organization_id";
