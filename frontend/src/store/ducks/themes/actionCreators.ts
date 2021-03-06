import { Action } from "redux";
import { TagsState } from "./state";
import { LoadingState } from '../../../interfaces/LoadingState';

export enum TagsActionType {
  SET_TAGS = 'tags/SET_TAGS',
  FETCH_TAGS = 'tags/FETCH_TAGS',
  SET_LOADING_STATE = 'tags/SET_LOADING_STATE'
}

// Interfaces
export interface SetTagsActionInterface extends Action<TagsActionType> {
  type: TagsActionType.SET_TAGS,
  payload: TagsState['items']
}
export interface FetchTagsActionInterface extends Action<TagsActionType> {
  type: TagsActionType.FETCH_TAGS
}
export interface SetTagsActionLoadingInterface extends Action<TagsActionType> {
  type: TagsActionType.SET_LOADING_STATE,
  payload: LoadingState
}

// Acrion creators
export const setTagsLoadingStatus = (payload: LoadingState): SetTagsActionLoadingInterface => ({
  type: TagsActionType.SET_LOADING_STATE,
  payload
});
export const setTags = (payload: TagsState['items']): SetTagsActionInterface => ({
  type: TagsActionType.SET_TAGS,
  payload
});
export const fetchTags = (): FetchTagsActionInterface => ({
  type: TagsActionType.FETCH_TAGS,
});


export type TagsAction = SetTagsActionInterface | SetTagsActionLoadingInterface | FetchTagsActionInterface; 