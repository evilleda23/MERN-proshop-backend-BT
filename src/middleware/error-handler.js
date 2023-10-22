import { StatusCodes } from 'http-status-codes';
import { HTTP_RESPONSE } from '../utils/http-response.utils.js';

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(StatusCodes.NOT_FOUND);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode =
    res.statusCode === StatusCodes.OK
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : res.statusCode;
  let message = error.message;

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    statusCode = StatusCodes.NOT_FOUND;
    message = 'Resource not found';
  }
  const stack = process.env.NODE_ENV === 'production' ? null : error.stack;
  message += `\n${stack}`;
  HTTP_RESPONSE(res, statusCode, error.message, null);
};

export { notFoundHandler, errorHandler };
