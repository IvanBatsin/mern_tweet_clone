import { Tweet } from "../tweets/contracts/state";

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER'
}

export interface FullTweetState {
  data?: Tweet,
  loadingState: LoadingState
}