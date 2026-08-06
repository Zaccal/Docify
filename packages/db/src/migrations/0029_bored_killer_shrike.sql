ALTER TABLE "cost_transactions_table" ALTER COLUMN "reason" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cost_transactions_table" ALTER COLUMN "reason" SET DEFAULT 'NEW_ORDER'::text;--> statement-breakpoint
DROP TYPE "public"."cost_transaction_reason";--> statement-breakpoint
CREATE TYPE "public"."cost_transaction_reason" AS ENUM('NEW_ORDER', 'CANCELLATION', 'REFUND');--> statement-breakpoint
ALTER TABLE "cost_transactions_table" ALTER COLUMN "reason" SET DEFAULT 'NEW_ORDER'::"public"."cost_transaction_reason";--> statement-breakpoint
ALTER TABLE "cost_transactions_table" ALTER COLUMN "reason" SET DATA TYPE "public"."cost_transaction_reason" USING "reason"::"public"."cost_transaction_reason";