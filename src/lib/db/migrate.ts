import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js/driver';

const dbUrl = process.env.DATABASE_URL_DEV ?? '';

const client = postgres(dbUrl);

const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });
