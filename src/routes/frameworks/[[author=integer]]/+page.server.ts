import type { PageServerLoad } from './$types';
import { GetFullFrameworkByAuthor, GetFullFrameworkById } from '$lib/utils/frameworkFetchers';

export const load = (async ({ params }) => {
	const authorId: number = params.author ? +params.author : 1;

	const framework = await GetFullFrameworkById(authorId);
	return { framework };
}) satisfies PageServerLoad;
