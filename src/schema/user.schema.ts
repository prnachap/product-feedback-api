import _ from 'lodash';
import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is Required' }).min(1, 'name too short - should be 3 chars minimum'),
    username: string({ required_error: 'Username is Required' }).min(
      1,
      'Username too short - should be 3 chars minimum'
    ),
    password: string({ required_error: 'Password is Required' }).min(
      8,
      'Password too short - should be 8 chars minimum'
    ),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => _.isEqual(data.password, data.passwordConfirmation), {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
