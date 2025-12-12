import express from 'express';
import { celebrate, Segments } from 'celebrate';
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
  '/',
  celebrate({ [Segments.QUERY]: getAllNotesSchema }),
  getAllNotes
);

// GET /notes/:noteId (валідація ID)
router.get(
  '/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  getNoteById
);

// POST /notes (валідація body)
router.post(
  '/',
  celebrate({ [Segments.BODY]: createNoteSchema }),
  createNote
);

// PATCH /notes/:noteId 
// Ми передаємо updateNoteSchema напряму, оскільки в src/validations/notesValidation.js 
// вона вже містить об'єкт з ключами { params: ..., body: ... }
router.patch(
  '/:noteId',
  celebrate(updateNoteSchema),
  updateNote
);

// DELETE /notes/:noteId (валідація ID)
router.delete(
  '/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  deleteNote
);

export default router;