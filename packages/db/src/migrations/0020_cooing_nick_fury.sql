ALTER TYPE "public"."organization" RENAME TO "company";--> statement-breakpoint
ALTER TABLE "cost_transactions_table" RENAME COLUMN "ip" TO "company";--> statement-breakpoint
DROP INDEX "cost_transactions_table_ip_idx";--> statement-breakpoint
CREATE INDEX "cost_transactions_table_company_idx" ON "cost_transactions_table" USING btree ("company");