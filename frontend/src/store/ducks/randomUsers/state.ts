import { LoadingState } from '../../../interfaces/LoadingState';
import { IUser } from '../../../interfaces/User';

export interface IRandomUsersState {
  users: IUser[],
  status: LoadingState
}