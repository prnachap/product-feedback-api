import Express from 'express';
import {
  createFeedbackHandler,
  deleteFeedbackHandler,
  getAllFeedbackHandler,
  getFeedbackByIdHandler,
  updateFeedbackHandler,
} from '../controller/feedback.controller';
import validate from '../middleware/validateResponse';
import { createFeedbackSchema, deleteFeedbackSchema, updateFeedbackSchema } from '../schema/feedback.schema';

const feedbackRoutes = Express.Router();

feedbackRoutes.get('/', getAllFeedbackHandler);
feedbackRoutes.get('/:id', getFeedbackByIdHandler);
feedbackRoutes.post('/', validate(createFeedbackSchema), createFeedbackHandler);

feedbackRoutes.put('/:id', validate(updateFeedbackSchema), updateFeedbackHandler);
feedbackRoutes.delete('/:id', validate(deleteFeedbackSchema), deleteFeedbackHandler);

export default feedbackRoutes;
