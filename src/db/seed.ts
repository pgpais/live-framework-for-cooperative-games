//seed using drizzle

import db from '.';
import { users, type User, frameworks, type Framework } from './schema';

const usersValues = [
	{
		createdAt: new Date(),
		updatedAt: new Date(),
		email: 'b@b.com',
		fullName: 'Bob Smith',
		password: '123456'
	},
	{
		createdAt: new Date(),
		updatedAt: new Date(),
		email: 'a@a.com',
		fullName: 'Alice Smith',
		password: '123456'
	}
] satisfies Omit<User, 'id'>[];

await db.insert(users).values(usersValues);

const frameworksValues = [
	{
		authorId: 1,
		title: 'manel',
		createdAt: new Date(),
		updatedAt: new Date()
	}
] satisfies Omit<Framework, 'id'>[];

await db.insert(frameworks).values(frameworksValues);
