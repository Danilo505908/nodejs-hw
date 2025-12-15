import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const customObjectId = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
};

// 1. Створення
export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

// 2. Оновлення
export const updateNoteSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(customObjectId).required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1), // Перевірка, що body не порожнє
};

// 3. Список
export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

// 4. ID
export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(customObjectId).required(),
  }),
};