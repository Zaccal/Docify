CREATE TYPE "public"."cost_transaction_reason" AS ENUM('NEW_ORDER', 'CORRECTION', 'CANCELLATION');--> statement-breakpoint
CREATE TYPE "public"."cost_transaction_status" AS ENUM('POSTED', 'VOID');--> statement-breakpoint
CREATE TYPE "public"."cost_transaction_type" AS ENUM('CHARGE', 'REVERSAL');--> statement-breakpoint
CREATE TYPE "public"."organization" AS ENUM('XANSHA', 'NomadDocs');--> statement-breakpoint
CREATE TABLE "cost_transactions_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid,
	"amount" numeric(12, 2) NOT NULL,
	"transaction_date" timestamp DEFAULT now() NOT NULL,
	"ip" "organization" DEFAULT 'XANSHA' NOT NULL,
	"type" "cost_transaction_type" DEFAULT 'CHARGE' NOT NULL,
	"reason" "cost_transaction_reason" DEFAULT 'NEW_ORDER' NOT NULL,
	"status" "cost_transaction_status" DEFAULT 'POSTED' NOT NULL,
	"reverses_transaction_id" uuid,
	"snapshot" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "documents_table" ADD COLUMN "ip" "organization" DEFAULT 'XANSHA' NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_transactions_table" ADD CONSTRAINT "cost_transactions_table_document_id_documents_table_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents_table"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cost_transactions_table_document_transaction_date_idx" ON "cost_transactions_table" USING btree ("transaction_date");--> statement-breakpoint
CREATE INDEX "cost_transactions_table_document_id_idx" ON "cost_transactions_table" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "cost_transactions_table_amount_idx" ON "cost_transactions_table" USING btree ("amount");--> statement-breakpoint
CREATE INDEX "cost_transactions_table_ip_idx" ON "cost_transactions_table" USING btree ("ip");--> statement-breakpoint
CREATE INDEX "cost_transactions_table_type_idx" ON "cost_transactions_table" USING btree ("type");--> statement-breakpoint
CREATE INDEX "cost_transactions_table_reason_idx" ON "cost_transactions_table" USING btree ("reason");--> statement-breakpoint
CREATE INDEX "cost_transactions_table_status_idx" ON "cost_transactions_table" USING btree ("status");