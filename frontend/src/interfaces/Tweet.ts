import { IUser } from "./User";

export interface Tweet {
  _id: string,
  text: string,
  createdAt: Date,
  images?: string[],
  user: IUser
}