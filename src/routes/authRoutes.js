import express from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

// POST /auth/register
router.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerUser
);

// POST /auth/login
router.post(
  '/auth/login',
  celebrate(loginUserSchema),
  loginUser
);

// POST /auth/refresh
router.post('/auth/refresh', refreshUserSession);

// POST /auth/logout
router.post('/auth/logout', logoutUser);

export default router;

