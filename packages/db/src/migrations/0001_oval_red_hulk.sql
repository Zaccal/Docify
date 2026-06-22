ALTER TABLE "customers_table" DROP CONSTRAINT "customers_table_organization_id_organizations_table_id_fk";
--> statement-breakpoint
ALTER TABLE "documents_table" DROP CONSTRAINT "documents_table_customer_id_customers_table_id_fk";
--> statement-breakpoint
ALTER TABLE "documents_table" DROP CONSTRAINT "documents_table_organization_id_organizations_table_id_fk";
--> statement-breakpoint
ALTER TABLE "customers_table" ADD CONSTRAINT "customers_table_organization_id_organizations_table_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_table" ADD CONSTRAINT "documents_table_customer_id_customers_table_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_table" ADD CONSTRAINT "documents_table_organization_id_organizations_table_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations_table"("id") ON DELETE cascade ON UPDATE no action;