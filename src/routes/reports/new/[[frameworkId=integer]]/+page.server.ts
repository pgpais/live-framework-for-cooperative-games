import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const frameworkId = params.frameworkId ? +params.frameworkId : 1;
	const framework = GetFullFrameworkById(frameworkId);
	return { framework };
}) satisfies PageServerLoad;
