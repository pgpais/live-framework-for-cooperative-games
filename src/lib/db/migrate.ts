import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const databaseUrl =
	process.env.DEV == 'true' ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL not set');

const client = postgres(databaseUrl);
console.log('DEV MODE: ', process.env.DEV == 'true');

const db = drizzle(client, { schema });

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' });

// pnpm tsx src/lib/db/migrate.ts
