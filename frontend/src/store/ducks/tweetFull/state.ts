import { Tweet } from '../../../interfaces/Tweet';
import { LoadingState } from '../../../interfaces/LoadingState';

export interface FullTweetState {
  data?: Tweet,
  loadingState: LoadingState
}