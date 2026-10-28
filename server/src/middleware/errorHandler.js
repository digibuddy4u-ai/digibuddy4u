import { ENV } from '../config/env.js';

export function notFound(req, res, next) {
  const error = new Error(`Resource not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Mongoose Buffering Timeout or Connection Failure
  if (
    err.message &&
    (err.message.includes('buffering timed out') ||
      err.message.includes('topology was destroyed') ||
      err.message.includes('Client must be connected') ||
      err.message.includes('before initial connection'))
  ) {
    statusCode = 503;
    message =
      'Database connection is not ready. Please replace "<db_username>" in server/.env with your MongoDB Atlas database username, then run "npm run seed".';
  }

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with id: ${err.value}`;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for '${field}'. Must be unique.`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((val) => val.message);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token.';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired. Please log in again.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: ENV.NODE_ENV === 'development' ? err.stack : undefined,
  });
}
