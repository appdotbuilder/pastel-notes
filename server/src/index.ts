import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createNoteInputSchema, 
  updateNoteInputSchema, 
  deleteNoteInputSchema, 
  searchNotesInputSchema 
} from './schema';

// Import handlers
import { createNote } from './handlers/create_note';
import { getNotes } from './handlers/get_notes';
import { getNoteById } from './handlers/get_note_by_id';
import { updateNote } from './handlers/update_note';
import { deleteNote } from './handlers/delete_note';
import { searchNotes } from './handlers/search_notes';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new note
  createNote: publicProcedure
    .input(createNoteInputSchema)
    .mutation(({ input }) => createNote(input)),
  
  // Get all notes
  getNotes: publicProcedure
    .query(() => getNotes()),
  
  // Get a specific note by ID
  getNoteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getNoteById(input.id)),
  
  // Update an existing note
  updateNote: publicProcedure
    .input(updateNoteInputSchema)
    .mutation(({ input }) => updateNote(input)),
  
  // Delete a note
  deleteNote: publicProcedure
    .input(deleteNoteInputSchema)
    .mutation(({ input }) => deleteNote(input)),
  
  // Search/filter notes
  searchNotes: publicProcedure
    .input(searchNotesInputSchema)
    .query(({ input }) => searchNotes(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Notes TRPC server listening at port: ${port}`);
}

start();