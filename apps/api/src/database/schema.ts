import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const clicks = pgTable('users', {
	deviceId: text('id').notNull(),
  time: timestamp('time').notNull(),
});

export const insertClickSchema = createInsertSchema(clicks);
export const selectClickSchema = createSelectSchema(clicks);
