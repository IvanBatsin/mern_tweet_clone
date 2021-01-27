import produce, { Draft } from 'immer';
import { FullTweetState } from './state';
import { FullTweetAction, FullTweetActionType } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

const initialTweetsState: FullTweetState = {
  data: undefined,
  loadingState: LoadingState.NEVER
}

export const fullTweetReducer = produce((draft: Draft<FullTweetState>, action: FullTweetAction) => {
  switch(action.type){
    case FullTweetActionType.SET_FULL_TWEET: {
      draft.data = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    }

    case FullTweetActionType.FETCH_FULL_TWEET: {
      draft.data = undefined;
      draft.loadingState = LoadingState.LOADING;
      break;
    }
    
    case FullTweetActionType.SET_LOADING_STATE: {
      draft.loadingState = action.payload;
      break;
    }
  }
}, initialTweetsState)