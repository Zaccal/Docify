-- Custom SQL migration file, put your code below! --
-- Ensure the migration is atomic.
BEGIN;

LOCK TABLE "cost_transactions_table"
IN ACCESS EXCLUSIVE MODE;

ALTER TABLE "cost_transactions_table"
  ALTER COLUMN "reason" DROP DEFAULT;

CREATE TYPE "cost_transaction_reason_new" AS ENUM (
  'NEW_ORDER',
  'REFUND',
  'REFUND_CANCELLATION'
);

ALTER TABLE "cost_transactions_table"
  ALTER COLUMN "reason"
  TYPE "cost_transaction_reason_new"
  USING (
    CASE
      WHEN "reason"::text = 'CANCELLATION'
        THEN 'REFUND_CANCELLATION'
      ELSE "reason"::text
    END
  )::"cost_transaction_reason_new";

DROP TYPE "cost_transaction_reason";

ALTER TYPE "cost_transaction_reason_new"
  RENAME TO "cost_transaction_reason";

ALTER TABLE "cost_transactions_table"
  ALTER COLUMN "reason"
  SET DEFAULT 'NEW_ORDER'::"cost_transaction_reason";

COMMIT;
