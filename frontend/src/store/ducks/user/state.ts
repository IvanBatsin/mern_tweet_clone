import { LoadingState } from '../../../interfaces/LoadingState';
import { IUser } from '../../../interfaces/User';

export interface IUserState {
  data: IUser | undefined,
  status: LoadingState
}