import { LoadingState } from '../../../interfaces/LoadingState';
import { Tweet } from '../../../interfaces/Tweet';

export enum AddFormLoading {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER'
}

export interface TweetsState {
  items: Tweet[],
  loadingState: LoadingState,
  AddFormLoadingState: AddFormLoading
}