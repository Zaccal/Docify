CREATE TABLE "customers_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullname_client" varchar(255) NOT NULL,
	"client_id_number" varchar(9) NOT NULL,
	"client_id_date_from" text NOT NULL,
	"client_id_type" text NOT NULL,
	"iin" varchar(12) NOT NULL,
	"organization_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enumeration" varchar(4) NOT NULL,
	"document_date" text[],
	"cells_line" text NOT NULL,
	"customer_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization" varchar NOT NULL,
	"bin" varchar(12) NOT NULL,
	"city" text NOT NULL,
	"index" text NOT NULL,
	"address" text NOT NULL,
	"cost_per_day" text NOT NULL,
	"iik" varchar(18) NOT NULL,
	"bik" varchar(9) NOT NULL,
	"bank" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customers_table" ADD CONSTRAINT "customers_table_organization_id_organizations_table_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_table" ADD CONSTRAINT "documents_table_customer_id_customers_table_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents_table" ADD CONSTRAINT "documents_table_organization_id_organizations_table_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations_table"("id") ON DELETE no action ON UPDATE no action;