DO $$ BEGIN
 CREATE TYPE "analysis_type" AS ENUM('played', 'pastPlayed', 'observations', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "public" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "analysis_type" "analysis_type" DEFAULT 'played' NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "other_analysis_type" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "analysis_description" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "framework_difficulty" smallint DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "framework_comments" text;