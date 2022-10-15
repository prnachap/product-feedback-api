import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import CommentModel, { ICommentModel } from '../model/comment.model';

export function createComment(input: DocumentDefinition<ICommentModel>) {
  return CommentModel.create(input);
}

export const findCommentById = (query: FilterQuery<ICommentModel>, options: QueryOptions = { lean: true }) => {
  return CommentModel.findById(query, options);
};

export const deleteCommentById = (query: FilterQuery<ICommentModel>, options: QueryOptions = { lean: true }) => {
  return CommentModel.deleteOne(query);
};

export const deleteManyComments = (query: FilterQuery<ICommentModel>) => {
  return CommentModel.deleteMany(query);
};
