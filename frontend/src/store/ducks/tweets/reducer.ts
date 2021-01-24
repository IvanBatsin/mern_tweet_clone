import produce, { Draft } from 'immer';
import { TweetsState, AddFromLoading } from './state';
import { TweetsActionType } from './actionCreators';
import { TweetsAction } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

const initialTweetsState: TweetsState = {
  items: [],
  loadingState: LoadingState.NEVER,
  addFormLoadingState: AddFromLoading.NEVER
}

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsAction) => {

  switch(action.type){
    case TweetsActionType.SET_TWEETS: {
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    }
    case TweetsActionType.FETCH_TWEETS: {
      draft.items = [];
      draft.loadingState = LoadingState.LOADING;
      break;
    }
    case TweetsActionType.SET_LOADING_STATE: {
      draft.loadingState = action.payload;
      break;
    }
    case TweetsActionType.FETCH_ADD_TWEET: {
      draft.addFormLoadingState = AddFromLoading.LOADING;
      break;
    }
    case TweetsActionType.ADD_TWEET: {
      draft.items.splice(0, 0, action.payload);
      draft.addFormLoadingState = AddFromLoading.NEVER;
      break;
    }
    case TweetsActionType.SET_ADD_FORM_STATE: {
      draft.addFormLoadingState = action.payload;
      break;
    }
  }
}, initialTweetsState)