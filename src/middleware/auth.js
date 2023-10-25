import { StatusCodes } from 'http-status-codes';

import asyncHandler from './async-handler.js';
import { HTTP_RESPONSE } from '../utils/http-response.util.js';
import { authenticateAndFetchUser } from '../utils/jwt.util.js';
//Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return HTTP_RESPONSE(
      res,
      StatusCodes.UNAUTHORIZED,
      'Not authorized, no token',
      null
    );
  }

  try {
    req.user = await authenticateAndFetchUser(token);
    next();
  } catch (error) {
    console.log(error);
    return HTTP_RESPONSE(
      res,
      StatusCodes.UNAUTHORIZED,
      'Not authorized, token failed',
      null
    );
  }
});

//Admin middleware

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return HTTP_RESPONSE(
      res,
      StatusCodes.UNAUTHORIZED,
      'Not authorized as an admin',
      null
    );
  }
};
