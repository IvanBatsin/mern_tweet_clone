import { LoadingState } from '../../../interfaces/LoadingState';
import { User } from '../../../interfaces/User';

export interface IUserState {
  data: User | undefined,
  status: LoadingState
}