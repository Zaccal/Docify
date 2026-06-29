ALTER TABLE "organizations_table" ADD COLUMN "kbe" varchar(2);--> statement-breakpoint
ALTER TABLE "organizations_table" ADD COLUMN "knp" varchar(3);--> statement-breakpoint
UPDATE "organizations_table" SET "kbe" = '', "knp" = '' WHERE "kbe" IS NULL OR "knp" IS NULL;--> statement-breakpoint
ALTER TABLE "organizations_table" ALTER COLUMN "kbe" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations_table" ALTER COLUMN "knp" SET NOT NULL;
