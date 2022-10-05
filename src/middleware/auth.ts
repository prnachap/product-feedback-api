import { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && !isEmpty(req.user)) {
    next();
  }
  return res.status(401).json({ data: 'Not Authorized' });
};
