SET lock_timeout = '5s';
SET statement_timeout = '5min';

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "documents_table" AS d
    INNER JOIN "customers_table" AS c
      ON c."id" = d."customer_id"
    WHERE d."organization_id"
      IS DISTINCT FROM c."organization_id"
  ) THEN
    RAISE EXCEPTION
      'Migration stopped: document organization does not match customer organization';
  END IF;
END
$$;

--> statement-breakpoint

ALTER TABLE "documents_table"
DROP CONSTRAINT IF EXISTS
"documents_table_organization_id_organizations_table_id_fk";

--> statement-breakpoint

ALTER TABLE "documents_table"
DROP CONSTRAINT IF EXISTS
"documents_table_customer_id_customers_table_id_fk";

--> statement-breakpoint

DROP INDEX IF EXISTS
"documents_table_organization_id_idx";

--> statement-breakpoint

ALTER TABLE "documents_table"
ADD CONSTRAINT
"documents_table_customer_id_customers_table_id_fk"
FOREIGN KEY ("customer_id")
REFERENCES "public"."customers_table" ("id")
ON DELETE restrict
ON UPDATE no action;

--> statement-breakpoint

ALTER TABLE "documents_table"
DROP COLUMN IF EXISTS "organization_id";
