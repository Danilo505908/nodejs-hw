import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            throw createHttpError(400, 'No file');
        }

        const { secure_url } = await saveFileToCloudinary(req.file.buffer);

        // Assuming req.user is set by authentication middleware
        // We need to find the user by ID from the session/token
        // If we don't have req.user yet, we need to implement auth middleware.
        // I will write this assuming req.user._id exists.

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: secure_url },
            { new: true }
        );

        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        res.json({
            url: user.avatar,
        });
    } catch (error) {
        next(error);
    }
};
