import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const dbUrl = process.env.DATABASE_URL_DEV ?? '';
console.log('DB URL: ', dbUrl);

const client = postgres(dbUrl);

const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });
