//seed using drizzle

import db from '.';
import { users, frameworks, type NewFramework, type NewUser } from './schema';

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
] satisfies NewUser[];

await db.insert(users).values(usersValues);

const frameworksValues = [
	{
		authorId: 1,
		title: 'manel',
		createdAt: new Date(),
		updatedAt: new Date()
	}
] satisfies NewFramework[];

await db.insert(frameworks).values(frameworksValues);
