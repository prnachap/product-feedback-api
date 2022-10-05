import { Request, Response, NextFunction } from 'express';
import { get, isEmpty } from 'lodash';
import { createFeedback, deleteFeedback, findAndUpdate, findFeedback } from '../service/feeback.service';

// @desc   Get all feeback
// @route  GET api/v1/feebacks
// @access Public
export const getAllFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await findFeedback({});
    return res.status(200).json({ data: isEmpty(feedbacks) ? [] : feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc   Get feeback by id
// @route  GET api/v1/feebacks/:id
// @access Public
export const getFeedbackByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbackId = get(req, 'params.id');
    const feedbacks = await findFeedback({ _id: feedbackId });
    return res.status(200).json({ data: isEmpty(feedbacks) ? {} : feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc   Create feedback
// @route  POST api/v1/feebacks
// @access Private
export const createFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const data = await createFeedback({ ...body });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// @desc   Update feedback
// @route  PUT api/v1/feebacks/:id
// @access Private
export const updateFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = get(req, 'params.id');

    const update = req.body;
    const feedback = await findFeedback({ _id: id });
    if (isEmpty(feedback)) {
      return res.status(400).json({ data: 'resourse not found' });
    }
    const data = await findAndUpdate({ _id: id }, update, { new: true, runValidators: true });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// @desc   Delete feedback
// @route  Delete api/v1/feebacks/:id
// @access Private
export const deleteFeedbackHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = get(req, 'params.id');
    const feedback = await findFeedback({ _id: id });
    if (isEmpty(feedback)) {
      return res.status(400).json({ data: 'resourse not found' });
    }
    await deleteFeedback({ _id: id });
    return res.status(200).json({ data: {} });
  } catch (error) {
    next(error);
  }
};
