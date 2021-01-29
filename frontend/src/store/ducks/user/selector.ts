import { IUserState } from './state';
import { RootStore } from '../../rootStore';
import { LoadingState } from '../../../interfaces/LoadingState';

export const selectUserState = (state: RootStore): IUserState => state.user;
export const selectUserLoadingStatus = (state: RootStore): IUserState['status'] => selectUserState(state).status;
export const selectUserData = (state: RootStore): IUserState['data'] => selectUserState(state).data;
export const selectIsAuth = (state: RootStore): boolean => !!selectUserState(state).data;
export const selectUserIsLoading = (state: RootStore): boolean => selectUserState(state).status === LoadingState.LOADING;
export const selectUserIsConfirmed = (state: RootStore): boolean => selectUserState(state).data?.confirmed!;