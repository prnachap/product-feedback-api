import express from 'express';
import { registerUser } from '../controller/user.controller';
import validate from '../middleware/validateResponse';
import { createUserSchema } from '../schema/user.schema';

const userRoutes = express.Router();

userRoutes.post('/register', validate(createUserSchema), registerUser);
export default userRoutes;
