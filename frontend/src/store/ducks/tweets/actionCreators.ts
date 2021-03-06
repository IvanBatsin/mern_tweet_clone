import { Action } from "redux";
import { TweetsState, AddFormLoading } from "./state";
import { LoadingState } from '../../../interfaces/LoadingState';
import { Tweet } from '../../../interfaces/Tweet';
  
export enum TweetsActionType {
  SET_TWEETS = 'tweets/SET_TWEETS',
  FETCH_TWEETS = 'tweets/FETCH_TWEETS',
  SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
  FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',
  ADD_TWEET = 'tweets/ADD_TWEET',
  DELETE_TWEET = 'tweets/DELETE_TWEET',
  SET_ADD_FORM_STATE = 'tweets/SET_ADD_FORM_STATE',
  FETCH_USER_TWEETS = 'tweets/FETCH_USER_TWEETS'
}

interface AddTweetPayload {
  text: string,
  images: string[]
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
  payload: AddTweetPayload
}
export interface AddTweetInterface extends Action<TweetsActionType> {
  type: TweetsActionType.ADD_TWEET,
  payload: Tweet
}
export interface DeleteTweetInterface extends Action<TweetsActionType> {
  type: TweetsActionType.DELETE_TWEET,
  payload: string
}
export interface SetAddFormStateInterface extends Action<TweetsActionType> {
  type: TweetsActionType.SET_ADD_FORM_STATE,
  payload: AddFormLoading
}
export interface FetchUserTweets extends Action<TweetsActionType> {
  type: TweetsActionType.FETCH_USER_TWEETS,
  payload: string
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
export const fetchAddTweet = (payload: AddTweetPayload): FetchAddTweetInterface => ({
  type: TweetsActionType.FETCH_ADD_TWEET,
  payload
});
export const addTweet = (payload: Tweet): AddTweetInterface => ({
  type: TweetsActionType.ADD_TWEET,
  payload
});
export const deleteTweet = (payload: string): DeleteTweetInterface => ({
  type: TweetsActionType.DELETE_TWEET, 
  payload
})
export const setAddFormState = (payload: AddFormLoading): SetAddFormStateInterface => ({
  type: TweetsActionType.SET_ADD_FORM_STATE,
  payload
});
export const fetchUserTweets = (payload: string): FetchUserTweets => ({
  type: TweetsActionType.FETCH_USER_TWEETS,
  payload
});



export type TweetsAction = 
  SetTweetsActionInterface    | 
  SetTweetsLoadingInterface   | 
  FetchTweetsActionInterface  | 
  FetchAddTweetInterface      |
  AddTweetInterface           |
  SetAddFormStateInterface    |
  DeleteTweetInterface        |
  FetchUserTweets; 