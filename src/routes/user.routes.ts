import Express from 'express';
import { deleteUserHandler, getAllUsersHandler } from '../controller/user.controller';
import validate from '../middleware/validateResponse';
import { deleteUserSchema } from '../schema/user.schema';
const userRoutes = Express.Router();

userRoutes.get('/', getAllUsersHandler);
userRoutes.delete('/:userId', validate(deleteUserSchema), deleteUserHandler);
export default userRoutes;
