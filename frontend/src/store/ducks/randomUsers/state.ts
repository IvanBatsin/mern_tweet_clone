import { LoadingState } from "../tweets/contracts/state";

export interface IUser {
  avatarUrl?: string | undefined;
  email: string,
  fullName: string,
  userName: string,
  password: string,
  confirmed?: boolean,
  confirmHash: string
  _id?: string,
  website?: string,
  location?: string,
  about?: string
}

export interface IRandomUsersState {
  users: IUser[],
  status: LoadingState
}