import type { User, Report, Game, Framework } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch, locals }) => {
	const session = await locals.auth.validate();

	if (session?.user.username != params.username) {
		console.log('user not themselves');
	}

	const user: User = await fetch('/api/users/' + params.username).then((res) => res.json());
	const reports: (Report & { game: Game })[] = await fetch('/api/reports/user/' + user.id).then(
		(res) => res.json()
	);
	const frameworks: Framework[] = await fetch('/api/frameworks/user/' + user.id).then((res) =>
		res.json()
	);
	return { user, reports, frameworks, session };
}) satisfies PageServerLoad;
