import { Action } from "redux";
import { LoadingState, FullTweetState } from "./state";

export enum FullTweetActionType {
  SET_FULL_TWEET = 'fullTweet/SET_FULL_TWEET',
  FETCH_FULL_TWEET = 'fullTweet/FETCH_FULL_TWEET',
  SET_LOADING_STATE = 'fullTweet/SET_LOADING_STATE'
}

// Interfaces
export interface SetFullTweetActionInterface extends Action<FullTweetActionType> {
  type: FullTweetActionType.SET_FULL_TWEET,
  payload: FullTweetState['data']
}
export interface FetchFullTweetActionInterface extends Action<FullTweetActionType> {
  type: FullTweetActionType.FETCH_FULL_TWEET,
  payload: string
}
export interface SetFullTweetActionLoadingInterface extends Action<FullTweetActionType> {
  type: FullTweetActionType.SET_LOADING_STATE,
  payload: LoadingState
}


// Action creators
export const setFullTweet = (payload: FullTweetState['data']): SetFullTweetActionInterface => ({
  type: FullTweetActionType.SET_FULL_TWEET,
  payload
});
export const fetchFullTweet = (payload: string): FetchFullTweetActionInterface => ({
  type: FullTweetActionType.FETCH_FULL_TWEET,
  payload
});
export const setFullTweetLoadingStatus = (payload: LoadingState): SetFullTweetActionLoadingInterface => ({
  type: FullTweetActionType.SET_LOADING_STATE,
  payload
});

export type FullTweetAction = 
  SetFullTweetActionInterface | 
  SetFullTweetActionLoadingInterface | 
  FetchFullTweetActionInterface; 