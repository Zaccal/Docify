ALTER TABLE "documents_table" DROP CONSTRAINT IF EXISTS "documents_table_enumeration_unique";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "documents_year_enumeration_unique" ON "documents_table" USING btree ("enumeration",EXTRACT(YEAR FROM "created_at"));
