import Express from 'express';
import { createFeedbackHandler, getAllFeedbackHandler } from '../controller/feedback.controller';
import validate from '../middleware/validateResponse';
import { createFeedbackSchema } from '../schema/feedback.schema';

const feedbackRoutes = Express.Router();

feedbackRoutes.get('/', getAllFeedbackHandler);
feedbackRoutes.post('/', validate(createFeedbackSchema), createFeedbackHandler);

export default feedbackRoutes;
