import { LoadingState } from '../../../interfaces/LoadingState';
import { User } from '../../../interfaces/User';

export interface IRandomUsersState {
  users: User[],
  status: LoadingState
}