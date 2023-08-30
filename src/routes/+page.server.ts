import type { PageServerLoad } from './$types';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';

export const load = (async ({ params }) => {
	const framework = await GetFullFrameworkById(1);
	return { framework };
}) satisfies PageServerLoad;
