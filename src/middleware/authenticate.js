import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

/**
 * Middleware to authenticate user via access token
 */
export const authenticate = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    // Check if accessToken exists
    if (!accessToken) {
      throw createHttpError(401, 'Missing access token');
    }

    // Find session by accessToken
    const session = await Session.findOne({ accessToken });
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    // Check if access token is expired
    if (new Date() > session.accessTokenValidUntil) {
      throw createHttpError(401, 'Access token expired');
    }

    // Find user associated with this session
    const user = await User.findById(session.userId);
    if (!user) {
      throw createHttpError(401);
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

