SET lock_timeout = '5s';
SET statement_timeout = '5min';

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "documents_table"
    GROUP BY "customer_id"
    HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION
      'Cannot add customer_id unique constraint: duplicate customer IDs exist';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'documents_table_customer_id_unique'
      AND conrelid = 'public.documents_table'::regclass
  ) THEN
    ALTER TABLE "documents_table"
    ADD CONSTRAINT "documents_table_customer_id_unique"
    UNIQUE ("customer_id");
  END IF;
END
$$;
