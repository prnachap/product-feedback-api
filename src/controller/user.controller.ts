import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import UserModel from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

//@desc   Register user
//@route  POST api/v1/auth
//@access Public

export const registerUser = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!_.isEmpty(user)) {
      return res
        .status(400)
        .json({ error: [{ message: "Account already exists" }] });
    }
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser.id);
  } catch (error) {
    next(error);
  }
};
