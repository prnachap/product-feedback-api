import mongoose, { Document } from 'mongoose';
import { ICommentModel } from './comment.model';
import { IUserModel } from './user.model';

export interface IFeedback {
  title: string;
  category: string;
  description: string;
  status: string;
  upvotes: IUserModel['_id'][];
  user: IUserModel['_id'];
  comments: ICommentModel['_id'][];
}

export interface IFeedbackModel extends Document, IFeedback {
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

FeedbackSchema.pre(/^find|save/, function (next) {
  this.populate([
    { path: 'user', select: 'username' },
    {
      path: 'comments',
      model: 'Comment',
      select: 'content user comments',
      populate: [
        {
          path: 'user',
          model: 'User',
          select: 'username',
        },
        {
          path: 'comments',
          model: 'Comment',
          select: 'content user comments',
        },
      ],
    },
  ]);
  next();
});

const FeedbackModel = mongoose.model<IFeedbackModel>('Feedback', FeedbackSchema);
export default FeedbackModel;
