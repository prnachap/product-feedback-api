import { object, string } from 'yup';

const payload = {
  body: object({
    content: string().required('Content is required'),
  }),
};

const params = {
  params: object({
    feedbackId: string().required('feedbackId is required'),
  }),
};

export const createCommentSchema = object({
  ...payload,
});

export const updateCommentSchema = object({
  ...params,
  ...payload,
});

export const deleteCommentSchema = object({
  ...params,
});
