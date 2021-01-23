import { Action } from "redux";
import { LoadingState, TweetsState, Tweet, AddFromLoading } from "./contracts/state";
  
export enum TweetsActionType {
  SET_TWEETS = 'tweets/SET_TWEETS',
  FETCH_TWEETS = 'tweets/FETCH_TWEETS',
  SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
  FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',
  ADD_TWEET = 'tweets/ADD_TWEET',
  SET_ADD_FORM_STATE = 'tweets/SET_ADD_FORM_STATE',
}

// Interfaces
export interface SetTweetsActionInterface extends Action<TweetsActionType> {
  type: TweetsActionType.SET_TWEETS,
  payload: TweetsState['items']
}
export interface FetchTweetsActionInterface extends Action<TweetsActionType> {
  type: TweetsActionType.FETCH_TWEETS
}
export interface SetTweetsLoadingInterface extends Action<TweetsActionType> {
  type: TweetsActionType.SET_LOADING_STATE,
  payload: LoadingState
}
export interface FetchAddTweetInterface extends Action<TweetsActionType> {
  type: TweetsActionType.FETCH_ADD_TWEET,
  payload: string
}
export interface AddTweetInterface extends Action<TweetsActionType> {
  type: TweetsActionType.ADD_TWEET,
  payload: Tweet
}
export interface SetAddFormStateInterface extends Action<TweetsActionType> {
  type: TweetsActionType.SET_ADD_FORM_STATE,
  payload: AddFromLoading
}



// Action creators
export const setTweets = (payload: TweetsState['items']): SetTweetsActionInterface => ({
  type: TweetsActionType.SET_TWEETS,
  payload
});
export const fetchTweets = (): FetchTweetsActionInterface => ({
  type: TweetsActionType.FETCH_TWEETS,
});
export const setTweetsLoadingStatus = (payload: LoadingState): SetTweetsLoadingInterface => ({
  type: TweetsActionType.SET_LOADING_STATE,
  payload
});
export const fetchAddTweet = (payload: string): FetchAddTweetInterface => ({
  type: TweetsActionType.FETCH_ADD_TWEET,
  payload
});
export const addTweet = (payload: Tweet): AddTweetInterface => ({
  type: TweetsActionType.ADD_TWEET,
  payload
});
export const setAddFormState = (payload: AddFromLoading): SetAddFormStateInterface => ({
  type: TweetsActionType.SET_ADD_FORM_STATE,
  payload
});



export type TweetsAction = 
  SetTweetsActionInterface    | 
  SetTweetsLoadingInterface   | 
  FetchTweetsActionInterface  | 
  FetchAddTweetInterface      |
  AddTweetInterface           |
  SetAddFormStateInterface; 