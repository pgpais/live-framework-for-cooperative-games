import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';

export const GET: RequestHandler = async ({ params }) => {
	const selectedFrameworkId = params.id ? +params.id : 0;
	const framework = await GetFullFrameworkById(selectedFrameworkId);
	return json(framework);
};
