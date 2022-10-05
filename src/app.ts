import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import feedbackRoutes from './routes/feedback.routes';
import userRoutes from './routes/user.routes';
import cookieSession from 'cookie-session';
import cors from 'cors';
import path from 'path';
import errorHandler from './middleware/error';

// passort stratergy
require('./utils/authPassport');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    maxAge: 15 * 60 * 1000,
    keys: ['secretkey'],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// mount routes
app.use('/api/v1/feedbacks', feedbackRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

export default app;
