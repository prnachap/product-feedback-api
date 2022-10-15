import Express from 'express';
import {
  addReplyHandler,
  createCommentHandler,
  createFeedbackHandler,
  deleteCommentHandler,
  deleteFeedbackHandler,
  deleteReplyHandler,
  getAllFeedbackHandler,
  getFeedbackByIdHandler,
  updateFeedbackHandler,
} from '../controller/feedback.controller';
import { protect } from '../middleware/auth';
import validate from '../middleware/validateResponse';
import { createCommentSchema } from '../schema/comment.schema';
import { createFeedbackSchema, deleteFeedbackSchema, updateFeedbackSchema } from '../schema/feedback.schema';

const feedbackRoutes = Express.Router();

feedbackRoutes.get('/', getAllFeedbackHandler);
feedbackRoutes.get('/:feedbackId', getFeedbackByIdHandler);
feedbackRoutes.post('/', protect, validate(createFeedbackSchema), createFeedbackHandler);

feedbackRoutes.put('/:feedbackId', protect, validate(updateFeedbackSchema), updateFeedbackHandler);
feedbackRoutes.delete('/:feedbackId', protect, validate(deleteFeedbackSchema), deleteFeedbackHandler);
feedbackRoutes.post('/comments/:feedbackId', protect, validate(createCommentSchema), createCommentHandler);
feedbackRoutes.delete('/:feedbackId/comments/:commentId', protect, deleteCommentHandler);

feedbackRoutes.post(
  '/:feedbackId/comments/:commentId/replies',
  protect,
  validate(createCommentSchema),
  addReplyHandler
);

feedbackRoutes.delete('/comments/:commentId/replies/:replyId', protect, deleteReplyHandler);

export default feedbackRoutes;
