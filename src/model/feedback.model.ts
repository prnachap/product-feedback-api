import mongoose, { Document } from 'mongoose';

export interface IFeedback {
  title: string;
  category: string;
  description: string;
  status: string;
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
  },
  { timestamps: true }
);

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);
export default FeedbackModel;
