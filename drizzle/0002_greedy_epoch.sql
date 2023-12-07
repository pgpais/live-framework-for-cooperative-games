DO $$ BEGIN
 CREATE TYPE "analysis_level" AS ENUM('macro', 'micro', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "game_mode" AS ENUM('coopCampaign', 'competitiveTeamPlay', 'coopScenarios', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "value_identification" AS ENUM('all', 'relevant', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "game_mode" "game_mode" DEFAULT 'coopCampaign' NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "game_mode_other" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "analysis_level" "analysis_level" DEFAULT 'macro' NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "analysis_level_other" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "value_identification" "value_identification" DEFAULT 'all' NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "value_identification_other" text;