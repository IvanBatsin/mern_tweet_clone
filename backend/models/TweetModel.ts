import { Schema, model, Document } from 'mongoose';

interface ITweetModel {
  text: string,
  user: string,
  // user: Schema.Types.ObjectId,
  images?: string[]
  // likes: number,
  // retweets: number,
  // replies: number
};

type TweetModelDocument = ITweetModel & Document
const tweetSchema = new Schema<TweetModelDocument>({
  text: {
    type: String,
    required: true,
    maxlength: 280
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [{
    type: String,
  }],
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  retweets: {
    type: Number,
    required: true,
    default: 0
  },
  replies: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const TweetModel = model<TweetModelDocument>('Tweet', tweetSchema);
export { TweetModel, TweetModelDocument };