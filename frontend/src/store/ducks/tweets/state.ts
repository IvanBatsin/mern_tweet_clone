import { LoadingState } from '../../../interfaces/LoadingState';
import { Tweet } from '../../../interfaces/Tweet';

export enum AddFromLoading {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER'
}

export interface TweetsState {
  items: Tweet[],
  loadingState: LoadingState,
  addFormLoadingState: AddFromLoading
}