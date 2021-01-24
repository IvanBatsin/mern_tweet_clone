import produce, { Draft } from 'immer';
import { TagsState } from './state';
import { TagsActionType, TagsAction } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

const initialTweetsState: TagsState = {
  items: [],
  loadingState: LoadingState.NEVER
}

export const tagsReducer = produce((draft: Draft<TagsState>, action: TagsAction) => {
  switch(action.type){
    case TagsActionType.SET_TAGS: {
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    }
    case TagsActionType.FETCH_TAGS: {
      draft.items = [];
      draft.loadingState = LoadingState.LOADING;
      break;
    }
    case TagsActionType.SET_LOADING_STATE: {
      draft.loadingState = action.payload;
      break;
    }
  }
}, initialTweetsState)