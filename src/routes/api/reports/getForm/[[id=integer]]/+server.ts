import { GetFullFrameworkById } from '$lib/utils/frameworkFetchers';
import type { RequestHandler } from './$types';
import { reportSchema } from '$lib/schemas/report';
import { superValidate } from 'sveltekit-superforms/server';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const frameworkId = params.id ? +params.id : 0;
	const framework = await GetFullFrameworkById(frameworkId);
	const form = await superValidate(framework, reportSchema);
	return json(form, { status: 200 });
};
