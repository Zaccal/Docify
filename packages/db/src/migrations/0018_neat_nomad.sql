ALTER TABLE "cost_transactions_table" ADD COLUMN "operation_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "cost_transactions_table" ADD CONSTRAINT "cost_transactions_table_reverses_transaction_id_cost_transactions_table_id_fk" FOREIGN KEY ("reverses_transaction_id") REFERENCES "public"."cost_transactions_table"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_transactions_table" ADD CONSTRAINT "cost_transactions_amount_sign_check" CHECK (
        (
          "cost_transactions_table"."type" = 'CHARGE'
          AND "cost_transactions_table"."amount" > 0
        )
        OR
        (
          "cost_transactions_table"."type" = 'REVERSAL'
          AND "cost_transactions_table"."amount" < 0
        )
      );