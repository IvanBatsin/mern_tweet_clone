import { Action } from 'redux';
import { IUser } from '../../../interfaces/User';
import { LoadingState } from '../../../interfaces/LoadingState';

export enum RandomUsersActionTypes {
  SET_ITEMS = 'random/SET_ITEMS',
  FETCH_RANDOM_USERS = 'random/FETCH_RANDOM_USERS',
  SET_lOADING_STATUS = 'random/SET_lOADING_STATUS'
}

// Interfaces
export interface ISetRandomUsers extends Action<RandomUsersActionTypes> {
  type: RandomUsersActionTypes.SET_ITEMS,
  payload: IUser[]
}
export interface IFetchRandomUsers extends Action<RandomUsersActionTypes> {
  type: RandomUsersActionTypes.FETCH_RANDOM_USERS
}
export interface IRandomUsersLoadingStatus extends Action<RandomUsersActionTypes> {
  type: RandomUsersActionTypes.SET_lOADING_STATUS,
  payload: LoadingState
}

// Action Creators
export const setRandomUsers = (payload: IUser[]): ISetRandomUsers => ({
  type: RandomUsersActionTypes.SET_ITEMS,
  payload
})
export const fetchSingIn = (): IFetchRandomUsers => ({
  type: RandomUsersActionTypes.FETCH_RANDOM_USERS
})
export const loadingStatus = (payload: LoadingState): IRandomUsersLoadingStatus => ({
  type: RandomUsersActionTypes.SET_lOADING_STATUS,
  payload
})


export type RandomUserAction = ISetRandomUsers | IFetchRandomUsers | IRandomUsersLoadingStatus;