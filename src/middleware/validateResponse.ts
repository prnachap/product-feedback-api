import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e: any) {
    return next(new ErrorResponse(e?.errors?.[0], 400));
  }
};

export default validate;
