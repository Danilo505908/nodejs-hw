import crypto from 'crypto';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';

/**
 * Generates a random token
 */
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Creates a new session for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<Session>} The created session
 */
export const createSession = async (userId) => {
  const accessToken = generateToken();
  const refreshToken = generateToken();
  const sessionId = generateToken();

  const now = new Date();
  const accessTokenValidUntil = new Date(now.getTime() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(now.getTime() + ONE_DAY);

  const session = await Session.create({
    userId,
    sessionId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return session;
};

/**
 * Sets session cookies in the response
 * @param {Response} res - Express response object
 * @param {Session} session - The session object
 */
export const setSessionCookies = (res, session) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  // Access token cookie - 15 minutes
  res.cookie('accessToken', session.accessToken, {
    ...cookieOptions,
    maxAge: FIFTEEN_MINUTES,
  });

  // Refresh token cookie - 1 day
  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });

  // Session ID cookie - 1 day
  res.cookie('sessionId', session.sessionId, {
    ...cookieOptions,
    maxAge: ONE_DAY,
  });
};

