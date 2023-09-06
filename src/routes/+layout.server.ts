import { DEV } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, LayoutServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals }: { locals: App.Locals }) => {
	const session = await locals.auth.validate();
	const user = session ? session.user : null;

	console.log('DEV MODE: ', DEV == 'true');

	return { session };
}) satisfies LayoutServerLoad;
