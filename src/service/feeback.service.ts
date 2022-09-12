import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import FeedbackModel, { IFeedbackModel } from '../model/feedback.model';

export function createFeedback(input: DocumentDefinition<IFeedbackModel>) {
  return FeedbackModel.create(input);
}
export function findFeedback(query: FilterQuery<IFeedbackModel>, options: QueryOptions = { lean: true }) {
  return FeedbackModel.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<IFeedbackModel>,
  update: UpdateQuery<IFeedbackModel>,
  options: QueryOptions
) {
  return FeedbackModel.findOneAndUpdate(query, update, options);
}

export function deleteFeedback(query: FilterQuery<IFeedbackModel>) {
  return FeedbackModel.deleteOne(query);
}
