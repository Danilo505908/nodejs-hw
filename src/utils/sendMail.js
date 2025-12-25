import nodemailer from 'nodemailer';
import { env } from 'node:process';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    const email = {
      from: env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const result = await transporter.sendMail(email);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.'
    );
  }
};
