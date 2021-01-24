import { RootStore } from '../../rootStore';
import { FullTweetState } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';

export const selectFullTweet = (state: RootStore): FullTweetState => state.tweet;

export const selectLoadingState = (state: RootStore): LoadingState => selectFullTweet(state).loadingState;

export const selectFullTweetIsLoading = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADING;
export const selectFullTweetIsLoaded = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADED;
export const selectFullTweetData = (state: RootStore): FullTweetState['data'] => selectFullTweet(state).data;