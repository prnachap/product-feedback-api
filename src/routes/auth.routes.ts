import Express, { Request, Response } from 'express';
import passport from 'passport';
import config from 'config';
import { getCurrentUser } from '../controller/auth.controller';
import { protect } from '../middleware/auth';

const authRoutes = Express.Router();

authRoutes.get('/auth/me', protect, getCurrentUser);
authRoutes.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRoutes.get(
  '/sessions/oauth/google',
  passport.authenticate('google', {
    failureRedirect: `${config.get<string>('origin')}/login`,
  }),
  (req: Request, res: Response) => {
    return res.redirect(`${config.get<string>('origin')}/auth/login-success`);
  }
);
export default authRoutes;
