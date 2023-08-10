import db from '$lib/db';
import {
	frameworks,
	type FirstLevelFramework,
	type FullCategory,
	type FullFramework
} from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GetFullFrameworkByAuthor } from '$lib/utils/frameworkFetchers';

export const load = (({ params }) => {
	const authorId: number = params.author ? +params.author : 1;

	const framework = GetFullFrameworkByAuthor(authorId);
	return { framework };
}) satisfies PageServerLoad;
