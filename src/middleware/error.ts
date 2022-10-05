import { ErrorRequestHandler } from 'express';
import { isEqual } from 'lodash';
import ErrorResponse from '../utils/errorResponse';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //   Mongoose duplicate Error
  if (isEqual(err?.code, 11000)) {
    const key = Object.keys(err.keyValue)?.[0];
    error = new ErrorResponse(`${key} already exists`, 400);
  }
  //   Mongoose CastError
  if (isEqual(err?.name, 'CastError')) {
    error = new ErrorResponse(`${err.path} is not invalid`, 400);
  }

  return res.status(error.statusCode || 500).json({ data: [], error: error?.message || 'Server Error' });
};
export default errorHandler;
