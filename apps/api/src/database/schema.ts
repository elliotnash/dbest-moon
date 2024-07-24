import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox';

export const clicks = pgTable('users', {
	deviceId: text('id').notNull(),
  time: timestamp('time').notNull(),
});

export const clickInsertSchema = createInsertSchema(clicks);
export type ClickInsert = typeof clickInsertSchema.static;

export const clickSelectSchema = createSelectSchema(clicks);
export type ClickSelect = typeof clickSelectSchema.static;
