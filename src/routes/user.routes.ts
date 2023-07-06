import Express from 'express';
import { deleteUserHandler, getAllUsersHandler } from '../controller/user.controller';
import validate from '../middleware/validateResponse';
import { deleteUserSchema } from '../schema/user.schema';
const userRoutes = Express.Router();

/**
 * @openapi
 * /api/v1/users:
 *  get:
 *    tags:
 *      - User
 *    summary: Get users
 *    responses:
 *      200:
 *        description: Success
 *        schema:
 *           items:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
userRoutes.get('/', getAllUsersHandler);
userRoutes.delete('/:userId', validate(deleteUserSchema), deleteUserHandler);
export default userRoutes;
