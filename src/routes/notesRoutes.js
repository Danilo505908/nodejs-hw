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

const router = express.Router();

// GET /notes (валідація query параметрів: page, perPage, search, tag)
router.get(
  '/notes',
  celebrate(getAllNotesSchema),
  getAllNotes
);

// GET /notes/:noteId (валідація ID)
router.get(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  getNoteById
);

// POST /notes (валідація body)
router.post(
  '/notes',
  celebrate(createNoteSchema),
  createNote
);

// PATCH /notes/:noteId
router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema),
  updateNote
);

// DELETE /notes/:noteId (валідація ID)
router.delete(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  deleteNote
);

export default router;