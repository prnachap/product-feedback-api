import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import UserModel, { IUserModel } from '../model/user.model';

export const findUsers = (query: FilterQuery<IUserModel>, options: QueryOptions = { lean: true }) => {
  return UserModel.find(query, {}, options);
};
export const findUserById = (query: FilterQuery<IUserModel>, options: QueryOptions = { lean: true }) => {
  return UserModel.findById(query, options);
};

export const findAndUpdateUser = (
  query: FilterQuery<IUserModel>,
  update: UpdateQuery<IUserModel>,
  options: QueryOptions = {}
) => {
  return UserModel.findOneAndUpdate(query, update, options);
};

export const deleteUser = (query: FilterQuery<IUserModel>) => {
  return UserModel.deleteOne(query);
};
