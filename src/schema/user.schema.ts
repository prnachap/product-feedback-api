import { object, string } from 'yup';

const payload = {
  body: object({
    name: string().required('Name is Required').min(3, 'Name should have minimum 3 characters'),
    email: string().required('Email is Required').email('Please add valid email'),
    username: string().required('Username is Required').min(3, 'Username should have minimum 3 characters'),
  }),
};

const params = {
  params: object({
    id: string().required('feedbackId is required'),
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...params,
  ...payload,
});

export const deleteUserSchema = object({
  ...params,
});
