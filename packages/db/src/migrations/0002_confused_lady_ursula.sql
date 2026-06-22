CREATE INDEX "customers_table_fullname_client_idx" ON "customers_table" USING btree ("fullname_client");--> statement-breakpoint
CREATE INDEX "customers_table_client_id_number_idx" ON "customers_table" USING btree ("client_id_number");--> statement-breakpoint
CREATE INDEX "customers_table_iin_idx" ON "customers_table" USING btree ("iin");--> statement-breakpoint
CREATE INDEX "documents_table_customer_id_idx" ON "documents_table" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "documents_table_organization_id_idx" ON "documents_table" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "organizations_table_organization_idx" ON "organizations_table" USING btree ("organization");--> statement-breakpoint
CREATE INDEX "organizations_table_bin_idx" ON "organizations_table" USING btree ("bin");--> statement-breakpoint
ALTER TABLE "customers_table" ADD CONSTRAINT "customers_table_fullname_client_unique" UNIQUE("fullname_client");--> statement-breakpoint
ALTER TABLE "customers_table" ADD CONSTRAINT "customers_table_client_id_number_unique" UNIQUE("client_id_number");--> statement-breakpoint
ALTER TABLE "customers_table" ADD CONSTRAINT "customers_table_iin_unique" UNIQUE("iin");--> statement-breakpoint
ALTER TABLE "organizations_table" ADD CONSTRAINT "organizations_table_organization_unique" UNIQUE("organization");--> statement-breakpoint
ALTER TABLE "organizations_table" ADD CONSTRAINT "organizations_table_bin_unique" UNIQUE("bin");