ALTER TABLE "games" ADD COLUMN "release_date" integer DEFAULT extract(epoch from now()) NOT NULL;