import { Schema, Types, model, Document } from 'mongoose';

interface ICommentModel {
  _id: string,
  owner: string,
  tweetId: string,
  text: string
}

type CommentModelDocument = ICommentModel & Document;

const CommentSchema = new Schema<CommentModelDocument>({
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  tweetId: {
    type: Types.ObjectId,
    ref: 'Tweet'
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const CommentModel = model<CommentModelDocument>('Comment', CommentSchema);
export {ICommentModel, CommentModel};