ALTER TABLE "games_to_companies" DROP CONSTRAINT "games_to_companies_game_id_company_id";--> statement-breakpoint
ALTER TABLE "games_to_genres" DROP CONSTRAINT "games_to_genres_game_id_genre_id";--> statement-breakpoint
ALTER TABLE "games_to_platforms" DROP CONSTRAINT "games_to_platforms_game_id_platform_id";--> statement-breakpoint
ALTER TABLE "games_to_companies" ADD CONSTRAINT "games_to_companies_game_id_company_id_pk" PRIMARY KEY("game_id","company_id");--> statement-breakpoint
ALTER TABLE "games_to_genres" ADD CONSTRAINT "games_to_genres_game_id_genre_id_pk" PRIMARY KEY("game_id","genre_id");--> statement-breakpoint
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_game_id_platform_id_pk" PRIMARY KEY("game_id","platform_id");