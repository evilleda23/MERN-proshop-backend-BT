import jwt from 'jsonwebtoken';
import { findUserById } from '../services/user.service.js';

export function generateToken(res, payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  const maxAge =
    eval(process.env.COOKIE_MAX_AGE) || Number(process.env.COOKIE_MAX_AGE);
  //Set cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: maxAge || 1000 * 60 * 60 * 24 * 7, //7 days
  });
}

export async function authenticateAndFetchUser(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await findUserById(decoded.userId);
}
