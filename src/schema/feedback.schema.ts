import { object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    category: string().required('Category is required'),
    status: string().required('Status is required'),
    description: string().required('Status is required').min(3, 'description should be min of 3 characters'),
  }),
};

const params = {
  params: object({
    feedbackId: string().required('feedbackId is required'),
  }),
};

export const createFeedbackSchema = object({
  ...payload,
});

export const updateFeedbackSchema = object({
  ...params,
  ...payload,
});

export const deleteFeedbackSchema = object({
  ...params,
});
