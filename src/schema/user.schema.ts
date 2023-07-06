import { object, string } from 'yup';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          default: Jane Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: jane_doe19
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: string
 */

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
