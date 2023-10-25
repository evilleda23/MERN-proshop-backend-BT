import jwt from 'jsonwebtoken';
import { findUserById } from '../services/user.service.js';

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

export async function authenticateAndFetchUser(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await findUserById(decoded.userId);
}
