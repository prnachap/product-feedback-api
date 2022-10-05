import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { deleteFeedback } from '../service/feeback.service';
import { findUsers } from '../service/user.service';

// @desc   Get all users
// @route  GET api/v1/users
// @access Public
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findUsers({});

    return res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

// @desc   Delete User
// @route  Delete api/v1/users
// @access Private
export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const id = get(req, 'params.id');
  try {
    await deleteFeedback({ _id: id });
    return res.status(200).json({ data: 'success' });
  } catch (error) {
    next(error);
  }
};
