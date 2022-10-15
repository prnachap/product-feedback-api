import { Request, Response, NextFunction } from 'express';
import { get, gt, gte, isEmpty, isEqual } from 'lodash';
import { User } from '../../global';
import { createComment, deleteCommentById, deleteManyComments, findCommentById } from '../service/comment.service';
import {
  createFeedback,
  deleteFeedback,
  findAllFeedback,
  findAndUpdate,
  findFeedback,
} from '../service/feeback.service';
import { findUserById } from '../service/user.service';
import ErrorResponse from '../utils/errorResponse';

// @desc   Get all feeback
// @route  GET api/v1/feebacks
// @access Public
export const getAllFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await findAllFeedback({});
    return res.status(200).json({ data: isEmpty(feedbacks) ? [] : feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc   Get feeback by id
// @route  GET api/v1/feebacks/:feedbackId
// @access Public
export const getFeedbackByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbackId = get(req, 'params.feedbackId');
    const feedbacks = await findFeedback({ _id: feedbackId });
    return res.status(200).json({ data: feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc   Create feedback
// @route  POST api/v1/feebacks
// @access Private
export const createFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user as User;
    const user = await findUserById({ _id: id }, { lean: false });
    const feedback = {
      ...req.body,
      user: id,
    };
    const data = await createFeedback(feedback);
    user?.posts.unshift(data.id);
    await user?.save();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// @desc   Update feedback
// @route  PUT api/v1/feebacks/:feedbackId
// @access Private
export const updateFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbackId = get(req, 'params.feedbackId');
    const { id: userId } = req.user as User;
    const update = req.body;
    const feedback = await findFeedback({ _id: feedbackId });
    if (isEmpty(feedback)) {
      return next(new ErrorResponse(`feedbackId-${feedbackId} not found`, 400));
    }
    if (!isEqual(feedback?.user?.toString(), userId)) {
      return next(new ErrorResponse('Not Authorized', 401));
    }
    const data = await findAndUpdate({ _id: feedbackId }, update, { new: true, runValidators: true });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// @desc   Delete feedback
// @route  Delete api/v1/feebacks/:feedbackId
// @access Private
export const deleteFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbackId = get(req, 'params.feedbackId');
    const { id: userId } = req.user as User;
    const feedback = await findFeedback({ _id: feedbackId });
    const user = await findUserById({ _id: userId }, { lean: false });
    const postIdInUserModel = user?.posts.findIndex((post) => {
      return post.toString() === feedbackId;
    });
    if (isEmpty(feedback)) {
      return next(new ErrorResponse(`feedbackId-${feedbackId} not found`, 400));
    }
    if (!isEqual(feedback?.user?.toString(), userId)) {
      return next(new ErrorResponse('Not Authorized', 401));
    }
    await deleteFeedback({ _id: feedbackId });
    if (gt(postIdInUserModel, -1)) {
      user?.posts.splice(postIdInUserModel as number, 1);
      await user?.save();
    }
    return res.status(200).json({ data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc   add comment to a post
// @route  POST api/v1/feebacks/comments/:feedbackId
// @access Private

export const createCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbackId = get(req, 'params.feedbackId');
    const { id: userId } = req.user as User;
    const feedback = await findFeedback({ _id: feedbackId }, { lean: false });

    if (isEmpty(feedback)) {
      return next(new ErrorResponse(`feedbackId-${feedbackId} not found`, 400));
    }

    const comment = await createComment({ ...req.body, user: userId });
    feedback?.comments.unshift(comment.id);
    await feedback?.save();
    const updatedData = await findFeedback({ _id: feedbackId });
    return res.status(200).json({ data: updatedData });
  } catch (error) {
    next(error);
  }
};

//  @desc add a reply
//  @route POST api/v1/feebacks/:feedbackId/comments/:commentId/    replies
//  @access Private
export const addReplyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = get(req, 'params.commentId');
    const feedbackId = get(req, 'params.feedbackId');
    const { id: userId } = req.user as User;
    const feedback = await findFeedback({ _id: feedbackId }, { lean: false });

    if (isEmpty(feedback)) {
      return next(new ErrorResponse(`feedbackId-${feedbackId} not found`, 400));
    }
    const selectedComment = await findCommentById({ _id: commentId }, { lean: false });

    if (isEmpty(selectedComment)) {
      return next(new ErrorResponse(`commentId-${commentId} not found`, 400));
    }

    // create a reply from comment model
    const reply = await createComment({ ...req.body, user: userId });
    selectedComment?.comments?.unshift(reply.id);
    await selectedComment?.save();

    // fetching feedback with comments and replies
    const updatedFeedback = await findFeedback({ _id: feedbackId });

    return res.status(200).json({ data: updatedFeedback });
  } catch (error) {
    next(error);
  }
};

// @desc   delete comment to a post
// @route  DELETE api/v1/feebacks/:feedbackId/comments/:commentId
// @access Private

export const deleteCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user as User;
    const feedbackId = get(req, 'params.feedbackId');
    const commentId = get(req, 'params.commentId');

    const feedback = await findFeedback({ _id: feedbackId }, { lean: false });
    const comment = await findCommentById({ _id: commentId }, { lean: false });
    const commentIndex = feedback?.comments.findIndex((comment) => isEqual(comment?._id.toString(), commentId));

    if (!feedback) {
      return next(new ErrorResponse(`feedbackId-${feedbackId} not found`, 400));
    }

    if (!comment) {
      return next(new ErrorResponse(`commentId-${commentId} not found`, 400));
    }

    if (!isEqual(comment?.user?.toString(), userId)) {
      return next(new ErrorResponse('Not Authorized', 401));
    }
    // delete comment
    // find and delete all nested replies with the parent comment
    const allReplies = comment?.comments;
    await deleteManyComments({ _id: { $in: allReplies } });
    await deleteCommentById({ _id: commentId });

    // remove comment from feedback model
    if (gte(commentIndex as number, 0)) {
      feedback?.comments?.splice(commentIndex as number, 1);
      await feedback?.save();
    }
    return res.status(200).json({ data: 'success' });
  } catch (error) {
    next(error);
  }
};

// @desc   delete reply to a comment
// @route  DELETE api/v1/feebacks/comments/:commentId/replies/:replyId
// @access Private

export const deleteReplyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user as User;
    const commentId = get(req, 'params.commentId');
    const replyId = get(req, 'params.replyId');

    const comment = await findCommentById({ _id: commentId }, { lean: false });

    const selectedReplyIndex = comment?.comments?.findIndex((replies) => isEqual(replies.toString(), replyId));

    if (!comment) {
      return next(new ErrorResponse(`commentId-${commentId} not found`, 400));
    }

    if (!gte(selectedReplyIndex, 0)) {
      return next(new ErrorResponse(`replyId-${replyId} not found`, 400));
    }

    if (!isEqual(comment?.user?.toString(), userId)) {
      return next(new ErrorResponse('Not Authorized', 401));
    }
    // delete replies
    await deleteCommentById({ _id: replyId });
    comment.comments.splice(selectedReplyIndex as number, 1);
    await comment.save();

    return res.status(200).json({ data: 'success' });
  } catch (error) {
    next(error);
  }
};

// @desc   like feedbacks
// @route  PUT api/v1/feebacks/:feedbackId/likes
// @access Private

export const feedbackLikesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user as User;
    const feedbackId = get(req, 'params.feedbackId');
    const feedback = await findFeedback({ _id: feedbackId }, { lean: false });

    if (!feedback) {
      return next(new ErrorResponse(`feedbackId-${feedbackId} not found`, 400));
    }
    const userIndex = feedback?.upvotes.findIndex((user) => isEqual(user.toString(), userId));
    // upvote if user has not liked the post
    // downvote if user has already liked the post
    if (gte(userIndex, 0)) {
      feedback.upvotes.splice(userIndex, 1);
    } else {
      feedback.upvotes.push(userId);
    }
    await feedback.save();
    return res.status(200).json({ data: feedback });
  } catch (error) {
    next(error);
  }
};
