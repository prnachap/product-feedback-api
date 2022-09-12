import express, { Request, Response } from 'express';
import helmet from 'helmet';
import feedbackRoutes from './routes/feedback.routes';

const app = express();
app.use(express.json());
app.use(helmet());

// mount routes
app.use('/api/v1/feedbacks', feedbackRoutes);

app.use((error: Error, req: Request, res: Response) => {
  return res.status(500).json({ error: [{ message: error.message }] });
});

export default app;
