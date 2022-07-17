import express, { Request, Response } from 'express';
import feedbackRoutes from './routes/feedback.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());

// mount routes
app.use(feedbackRoutes);
app.use('/api/v1/auth', userRoutes);
app.use((error: Error, req: Request, res: Response) => {
  return res.status(500).json({ error: [{ message: error.message }] });
});

export default app;
