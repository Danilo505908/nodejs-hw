import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

/**
 * Register a new user
 */
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(400, 'Email in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Create session and set cookies
    const session = await createSession(user._id);
    setSessionCookies(res, session);

    // Return user without password (thanks to toJSON method)
    res.status(201).json(user);
  } catch (error) {
    console.error('registerUser error:', error);
    next(error);
  }
};

/**
 * Login user
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid credentials');
    }

    // Delete old sessions for this user
    await Session.deleteMany({ userId: user._id });

    // Create new session and set cookies
    const session = await createSession(user._id);
    setSessionCookies(res, session);

    // Return user without password (thanks to toJSON method)
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh user session
 */
export const refreshUserSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Session not found');
    }

    // Find session by sessionId and refreshToken
    const session = await Session.findOne({
      sessionId,
      refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    // Check if refresh token is expired
    if (new Date() > session.refreshTokenValidUntil) {
      throw createHttpError(401, 'Session token expired');
    }

    // Delete old session
    await Session.findByIdAndDelete(session._id);

    // Create new session and set cookies
    const newSession = await createSession(session.userId);
    setSessionCookies(res, newSession);

    res.status(200).json({
      message: 'Session refreshed',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
export const logoutUser = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    // Delete session if sessionId exists
    if (sessionId) {
      await Session.findOneAndDelete({ sessionId });
    }

    // Clear cookies
    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

