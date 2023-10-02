import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error('DATABASE_URL not set');

const client = postgres(dbUrl);

const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });
