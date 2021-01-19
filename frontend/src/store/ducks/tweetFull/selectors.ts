import { RootStore } from '../../rootStore';
import { LoadingState, FullTweetState } from './state';

export const selectFullTweet = (state: RootStore): FullTweetState => state.tweet;

export const selectLoadingState = (state: RootStore): LoadingState => selectFullTweet(state).loadingState;

export const selectFullTweetIsLoading = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADING;
export const selectFullTweetIsLoaded = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADED;
export const selectFullTweetData = (state: RootStore): FullTweetState['data'] => selectFullTweet(state).data;