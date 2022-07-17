import mongoose, { Document } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import config from 'config';

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface IUserModel extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
  matchPassword: (candidatePassword: string) => boolean;
}

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      select: false,
    },
    // avatar: {
    //   type: String,
    // },
    //   posts: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
  },
  {
    timestamps: true,
  }
);

// Encrypt Password
userSchema.pre('save', async function (next) {
  const user = this as IUserModel;

  if (!user.isModified('password')) {
    return next();
  }
  const salt = await genSalt(config.get<number>('saltWorkFactor'));
  user.password = await hash(this.password, salt);
  next();
});

// // Sign JWT and Return
// userSchema.methods.getSignedJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     // expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// Match user entered password to hashpassword
userSchema.methods.matchPassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUserModel;
  return await compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
