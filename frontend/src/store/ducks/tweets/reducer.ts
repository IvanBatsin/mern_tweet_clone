import produce, { Draft } from 'immer';
import { TweetsState, AddFormLoading } from './state';
import { TweetsActionType } from './actionCreators';
import { TweetsAction } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

const initialTweetsState: TweetsState = {
  items: [],
  loadingState: LoadingState.NEVER,
  AddFormLoadingState: AddFormLoading.NEVER
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
      draft.AddFormLoadingState = AddFormLoading.LOADING;
      break;
    }

    case TweetsActionType.ADD_TWEET: {
      draft.items.splice(0, 0, action.payload);
      draft.AddFormLoadingState = AddFormLoading.NEVER;
      break;
    }

    case TweetsActionType.DELETE_TWEET: {
      draft.items = draft.items.filter(item => item._id !== action.payload)
      break;
    }

    case TweetsActionType.SET_ADD_FORM_STATE: {
      draft.AddFormLoadingState = action.payload;
      break;
    }
  }
}, initialTweetsState)