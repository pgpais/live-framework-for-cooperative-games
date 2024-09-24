ALTER TABLE "categories" DROP CONSTRAINT "categories_framework_id_frameworks_id_fk";
--> statement-breakpoint
ALTER TABLE "dimensions" DROP CONSTRAINT "dimensions_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "dimension_examples" DROP CONSTRAINT "dimension_examples_dimension_id_dimensions_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories" ADD CONSTRAINT "categories_framework_id_frameworks_id_fk" FOREIGN KEY ("framework_id") REFERENCES "frameworks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dimensions" ADD CONSTRAINT "dimensions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dimension_examples" ADD CONSTRAINT "dimension_examples_dimension_id_dimensions_id_fk" FOREIGN KEY ("dimension_id") REFERENCES "dimensions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
