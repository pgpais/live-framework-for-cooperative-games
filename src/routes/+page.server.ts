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

