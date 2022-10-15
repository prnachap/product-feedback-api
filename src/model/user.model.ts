import mongoose, { Document } from 'mongoose';
import { IFeedbackModel } from './feedback.model';

export interface IUser {
  name: string;
  email: string;
  username: string;
  posts: IFeedbackModel['_id'][];
}

export interface IUserModel extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUserModel>('User', UserSchema);
export default UserModel;
