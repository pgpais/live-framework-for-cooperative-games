import type { PageServerLoad } from './$types';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = (async ({ params, locals }) => {
	const framework = await GetFullFrameworkById(1);

	return {
		framework
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/logout'); // redirect to login page
	}
};
