import express from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
  getResetPasswordForm,
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

// POST /auth/request-reset-email
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail
);

// POST /auth/reset-password
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword
);

// GET /reset-password (helper page)
router.get('/reset-password', getResetPasswordForm);

export default router;

