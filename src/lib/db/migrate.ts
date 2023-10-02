import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const dbUrl = process.env.DATABASE_URL ?? '';
console.log('DB URL: ', dbUrl);

const client = postgres(dbUrl);

const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });
