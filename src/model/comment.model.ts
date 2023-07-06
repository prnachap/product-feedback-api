import mongoose, { Document } from 'mongoose';
import { IUserModel } from './user.model';

export interface IComments {
  content: string;
  user: IUserModel['_id'];
  comments: string[];
}
export interface ICommentModel extends IComments, Document {
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

CommentSchema.pre(/^find/, function (next) {
  this.populate([
    { path: 'user', select: 'username name' },
    { path: 'comments', select: 'content' },
  ]);
  next();
});

const CommentModel = mongoose.model<ICommentModel>('Comment', CommentSchema);

export default CommentModel;
