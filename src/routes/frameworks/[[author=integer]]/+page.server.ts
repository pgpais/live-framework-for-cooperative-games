import type { PageServerLoad } from './$types';
import { GetFullFrameworkByAuthor } from '$lib/utils/frameworkFetchers';

export const load = (async ({ params }) => {
	const authorId: number = params.author ? +params.author : 1;

	const framework = await GetFullFrameworkByAuthor(authorId);
	return { framework };
}) satisfies PageServerLoad;
