import { RootStore } from '../../rootStore';
import { TweetsState, AddFromLoading } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';


export const selectTweets = (state: RootStore): TweetsState => state.tweets;

export const selectLoadingState = (state: RootStore): LoadingState => selectTweets(state).loadingState;

export const selectAddFormState = (state: RootStore): AddFromLoading => selectTweets(state).addFormLoadingState;

export const selectTweetsIsLoading = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADING;
export const selectTweetsIsLoaded = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADED;

export const selectTweetsItems = (state: RootStore) => selectTweets(state).items;