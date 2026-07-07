SET lock_timeout = '5s';

ALTER TABLE "organizations_table"
ALTER COLUMN "cost_per_day" SET DATA TYPE numeric(10, 2)
USING "cost_per_day"::numeric(10, 2);
