import { z } from 'zod';

// Note schema with proper type handling
export const noteSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()), // Array of tag strings
  category: z.string().nullable(), // Optional category, can be null
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Note = z.infer<typeof noteSchema>;

// Input schema for creating notes
export const createNoteInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  tags: z.array(z.string()).default([]), // Default to empty array if not provided
  category: z.string().nullable().optional() // Can be null or undefined
});

export type CreateNoteInput = z.infer<typeof createNoteInputSchema>;

// Input schema for updating notes
export const updateNoteInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().nullable().optional()
});

export type UpdateNoteInput = z.infer<typeof updateNoteInputSchema>;

// Search input schema for filtering notes
export const searchNotesInputSchema = z.object({
  query: z.string().optional(), // Search query for title/content
  tags: z.array(z.string()).optional(), // Filter by tags
  category: z.string().nullable().optional() // Filter by category
});

export type SearchNotesInput = z.infer<typeof searchNotesInputSchema>;

// Schema for deleting a note
export const deleteNoteInputSchema = z.object({
  id: z.number()
});

export type DeleteNoteInput = z.infer<typeof deleteNoteInputSchema>;