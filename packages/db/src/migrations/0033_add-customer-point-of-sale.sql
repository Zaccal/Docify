CREATE TYPE "public"."point_of_sale" AS ENUM('Караганда', 'Жанаарка');--> statement-breakpoint
ALTER TABLE "customers_table" ADD COLUMN "point_of_sale" "point_of_sale" DEFAULT 'Жанаарка' NOT NULL;