import express from 'express';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  updateNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
} from '../validations/notesValidation.js';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// GET /notes (валідація query параметрів: page, perPage, search, tag)
router.get(
  '/notes',
  authenticate,
  celebrate(getAllNotesSchema),
  getAllNotes
);

// GET /notes/:noteId (валідація ID)
router.get(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  getNoteById
);

// POST /notes (валідація body)
router.post(
  '/notes',
  authenticate,
  celebrate(createNoteSchema),
  createNote
);

// PATCH /notes/:noteId
router.patch(
  '/notes/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote
);

// DELETE /notes/:noteId (валідація ID)
router.delete(
  '/notes/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote
);

export default router;