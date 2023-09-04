import { DEV, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { adapter } from '$lib/db';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

import { github } from '@lucia-auth/oauth/providers';

export const auth = lucia({
	env: DEV ? 'DEV' : 'PROD',
	adapter: adapter,
	middleware: sveltekit(),

	getUserAttributes: (data) => {
		return {
			username: data.username,
			full_name: data.full_name,
			email: data.email
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
