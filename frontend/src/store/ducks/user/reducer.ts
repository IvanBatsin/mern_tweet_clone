import produce, { Draft } from 'immer';
import { UserAction, UserActionTypes } from './actionCreators';
import { IUserState } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';

const initalState: IUserState = {
  data: undefined,
  status: LoadingState.NEVER
}

export const userReducer = produce((draft: Draft<IUserState>, action: UserAction) => {
  switch(action.type) {
    case UserActionTypes.SET_USER_DATA: {
      draft.data = action.payload;
      draft.status = LoadingState.LOADED;
      break;
    }

    case UserActionTypes.SET_LODAING_STATE: {
      draft.data = undefined;
      draft.status = action.payload;
      break;
    }

    default: break;
  }
}, initalState);