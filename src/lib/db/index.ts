import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';

export const client = postgres(DATABASE_URL);

const db = drizzle(client, { schema });

export const adapter = postgresAdapter(client, {
	user: 'users',
	session: 'user_session',
	key: 'user_key'
});

export default db;
