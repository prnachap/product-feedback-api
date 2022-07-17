import mongoose from 'mongoose';
import { IUserModel } from './user.model';

export interface SessionDocument extends mongoose.Document {
  user: IUserModel['_id'];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const SessionModel = mongoose.model('Session', sessionSchema);
export default SessionModel;
