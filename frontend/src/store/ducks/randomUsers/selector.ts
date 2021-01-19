import { IRandomUsersState } from './state';
import { RootStore } from '../../rootStore';

export const selectRandomUsersState = (state: RootStore): IRandomUsersState => state.randomUsers;
export const selectRandomUsersItems = (state: RootStore): IRandomUsersState['users'] => selectRandomUsersState(state).users;
export const selectRandomUsersLoadingStatus = (state: RootStore): IRandomUsersState['status'] => selectRandomUsersState(state).status;