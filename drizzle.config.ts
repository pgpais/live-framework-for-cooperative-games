import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
	schema: './src/lib/db/schema/*',
	driver: 'pg',
	dbCredentials: {
		connectionString:
			process.env.DEV == 'true' ? process.env.DATABASE_URL_DEV! : process.env.DATABASE_URL!
	}
} satisfies Config;
