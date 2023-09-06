import db from '$lib/db';
import { frameworks, type Framework, users } from '$lib/db/schema';
import { ilike, eq, or } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const pageParam = url.searchParams.get('page');
	const pageSizeParam = url.searchParams.get('pageSize');

	const page = pageParam && !Number.isNaN(+pageParam) ? +pageParam : 0;
	const pageSize = pageSizeParam && !Number.isNaN(+pageSizeParam) ? +pageSizeParam : 10;
	const query = url.searchParams.has('q') ? url.searchParams.get('q') : '';

	const fetchedFrameworks = (
		await db
			.select({ framework: frameworks, author: users })
			.from(frameworks)
			.innerJoin(users, eq(users.id, frameworks.authorId))
			.where(or(ilike(frameworks.title, `%${query}%`), ilike(users.username, `%${query}%`)))
			.limit(pageSize)
			.offset(page * pageSize)
	).map((row) => {
		return { ...row.framework, author: row.author };
	});

	return { frameworks: fetchedFrameworks, page, query };
}) satisfies PageServerLoad;

// export const actions = {
// 	search: async (query: string) => {
// }
