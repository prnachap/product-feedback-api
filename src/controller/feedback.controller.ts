import { Request, Response, NextFunction } from 'express';
import { get, isEmpty } from 'lodash';
import { createFeedback, findFeedback } from '../service/feeback.service';

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
    const feedbacks = await findFeedback({ feedbackId });

    return res.status(200).json({ data: isEmpty(feedbacks) ? [] : feedbacks });
  } catch (error) {
    next(error);
  }
};

// @desc   create feedback
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
