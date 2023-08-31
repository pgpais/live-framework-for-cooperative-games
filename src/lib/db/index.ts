import { DATABASE_URL, DEV } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { lucia } from 'lucia';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { sveltekit } from 'lucia/middleware';

import { github } from '@lucia-auth/oauth/providers';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const client = postgres(DATABASE_URL);

const db = drizzle(client, { schema });

const adapter = postgresAdapter(client, {
	user: 'auth_user',
	session: 'user_session',
	key: 'user_key'
});

const auth = lucia({
	env: DEV ? 'DEV' : 'PROD',
	adapter: adapter,
	middleware: sveltekit(),

	getUserAttributes: (data) => {
		return {
			githubUsername: data.github_username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export default db;
export type Auth = typeof auth;
