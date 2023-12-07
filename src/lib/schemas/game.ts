import { games } from '$lib/db/schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertGameSchema = createInsertSchema(games);
export type InsertGameSchema = typeof insertGameSchema;
