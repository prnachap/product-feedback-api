import mongoose, { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  username: string;
}

export interface IUserModel extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new mongoose.Schema({
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
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);
export default UserModel;
