import { serial, text, pgTable, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const notesTable = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tags: jsonb('tags').notNull().default('[]'), // Store tags as JSON array
  category: text('category'), // Nullable by default, matches Zod schema
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type Note = typeof notesTable.$inferSelect; // For SELECT operations
export type NewNote = typeof notesTable.$inferInsert; // For INSERT operations

// Important: Export all tables for proper query building
export const tables = { notes: notesTable };