import Express, { Request, Response } from 'express';
import passport from 'passport';
import config from 'config';
import { getCurrentUser, getLogoutHandler } from '../controller/auth.controller';
import { protect } from '../middleware/auth';

const authRoutes = Express.Router();

/**
 * @openapi
 * /api/v1/login/google:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequestBody'
 *     components:
 *       schemas:
 *         LoginUserRequestBody:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             username:
 *               type: string
 */
authRoutes.get('/auth/me', protect, getCurrentUser);

authRoutes.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRoutes.get(
  '/sessions/oauth/google',
  passport.authenticate('google', {
    failureRedirect: `${config.get<string>('origin')}/login`,
  }),
  (req: Request, res: Response) => {
    return res.redirect(`${config.get<string>('origin')}/`);
  }
);
authRoutes.post('/auth/logout', protect, getLogoutHandler);
export default authRoutes;
