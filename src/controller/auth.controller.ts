import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../service/user.service';

// @desc   Get Current User
// @route  Get api/v1/auth/me
// @access Private
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById({ _id: (req?.user as { id: string; username: string }).id }, { lean: false });
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

// @desc   logout user
// @route  Get api/v1/auth/logout
// @access Private
export const getLogoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut({ keepSessionInfo: false }, function (err) {
      if (err) {
        return next(err);
      }
    });
  } catch (err) {
    return next(err);
  }
  res.status(200).json({ isAuthenticated: req.isAuthenticated() });
};
