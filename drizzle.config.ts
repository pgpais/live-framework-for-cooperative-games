import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
	dialect: 'postgresql',
	schema: './src/lib/db/schema/*',
	dbCredentials: {
		url: process.env.DEV == 'true' ? process.env.DATABASE_URL_DEV! : process.env.DATABASE_URL!
	},
	out: './drizzle'
} satisfies Config;
