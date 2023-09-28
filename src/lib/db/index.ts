import { DATABASE_URL, DATABASE_URL_DEV, DEV } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

export const client = postgres(DEV == 'true' ? DATABASE_URL_DEV : DATABASE_URL);
console.log('DEV MODE: ', DEV == 'true');

const db = drizzle(client, { schema });

export const adapter = postgresAdapter(client, {
	user: 'users',
	session: 'user_session',
	key: 'user_key'
});

await migrate(db, { migrationsFolder: 'drizzle' });

export default db;
