import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../service/user.service';

// @desc   Get Current User
// @route  Get api/v1/auth/me
// @access Private
export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById({ _id: (req?.user as { id: string; username: string }).id });
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

// @desc   logout user
// @route  Get api/v1/auth/logout
// @access Private
export const getLogoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.status(200);
    // res.send('Logged out successfully').redirect('/');
  });
};
