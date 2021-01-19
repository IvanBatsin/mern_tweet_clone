import produce, { Draft } from 'immer';
import { IFetchRandomUsers, ISetRandomUsers, RandomUserAction, fetchSingIn, setRandomUsers, RandomUsersActionTypes } from './actionCreators';
import { IRandomUsersState } from './state';
import { LoadingState } from '../tweets/contracts/state';

const initalState: IRandomUsersState = {
  users: [],
  status: LoadingState.NEVER
}

export const randomUsersReducer = produce((draft: Draft<IRandomUsersState>, action: RandomUserAction) => {
  switch(action.type) {
    case RandomUsersActionTypes.SET_ITEMS: {
      draft.users = action.payload;
      draft.status = LoadingState.LOADED;
      break;
    }

    case RandomUsersActionTypes.FETCH_RANDOM_USERS: {
      draft.users = [];
      draft.status = LoadingState.LOADING;
      break;
    }

    case RandomUsersActionTypes.SET_lOADING_STATUS: {
      draft.users = [];
      draft.status = action.payload;
      break;
    }

    default: break;
  }
}, initalState);