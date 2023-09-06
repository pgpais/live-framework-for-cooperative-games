import type { PageServerLoad } from './$types';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';

export const load = (async ({ params }) => {
	const authorId: number = params.id ? +params.id : 1;

	const framework = await GetFullFrameworkById(authorId);
	return { framework };
}) satisfies PageServerLoad;
