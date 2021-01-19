import {model, Schema, Document} from 'mongoose';

interface IUser {
  email: string,
  fullName: string,
  userName: string,
  password: string,
  confirmed?: boolean,
  confirmHash: string
}

type UserModelDocument = IUser & Document;

const userSchema = new Schema<UserModelDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmHash: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  website: {
    type: String
  },
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, obj) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  }
});

const UserModel = model<UserModelDocument>('User', userSchema);
export {UserModel, UserModelDocument}