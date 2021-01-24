import { RootStore } from '../../rootStore';
import { createSelector } from 'reselect'
import { TagsState } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';

export const selectTags = (state: RootStore): TagsState => state.themes;

export const selectLoadingState = (state: RootStore): LoadingState => selectTags(state).loadingState;

export const selectTagsIsLoading = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADING;
export const selectTagsIsLoaded = (state: RootStore): boolean => selectLoadingState(state) === LoadingState.LOADED;

export const selectTagsItems = createSelector(selectTags, (Tags) => Tags.items);