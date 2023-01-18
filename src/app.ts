import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import path from 'path';
import errorHandler from './middleware/error';
import morganMiddleware from './middleware/morganMiddleware';
import authRoutes from './routes/auth.routes';
import feedbackRoutes from './routes/feedback.routes';
import userRoutes from './routes/user.routes';
import config from 'config';

// passort stratergy
require('./utils/authPassport');
export const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    maxAge: 60 * 60 * 1000,
    keys: [config.get<string>('sessionSecretKey')],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// request logger middleware
app.use(morganMiddleware);
// mount routes
app.use('/api/v1/feedbacks', feedbackRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', authRoutes);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

export default app;
