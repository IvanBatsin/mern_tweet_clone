import { Action } from 'redux';
import { IUser, IUserState } from './state';
import { LoadingState } from '../tweets/contracts/state';
import { IFormInputs } from '../../../pages/singIn/components/LoginModal';
import { IFormInputsRegister } from '../../../pages/singIn/components/RegisterPopup';

export enum UserActionTypes {
  SET_USER_DATA = 'user/SET_USER_DATA',
  SET_LODAING_STATE = 'user/SET_LODAING_STATE',
  FETCH_SING_IN = 'user/FETCH_SING_IN',
  FETCH_SING_UP = 'user/FETCH_SING_UP',
}

// Interfaces
export interface ISetUserData extends Action<UserActionTypes> {
  type: UserActionTypes.SET_USER_DATA,
  payload: IUser | undefined
}
export interface ISetUserLoading extends Action<UserActionTypes> {
  type: UserActionTypes.SET_LODAING_STATE,
  payload: LoadingState
}
export interface IFetchSingInUser extends Action<UserActionTypes> {
  type: UserActionTypes.FETCH_SING_IN,
  payload: IFormInputs
}
export interface IFetchSingUp extends Action<UserActionTypes> {
  type: UserActionTypes.FETCH_SING_UP,
  payload: IFormInputsRegister
}

// Action Creators
export const setUserData = (payload: IUserState['data']): ISetUserData => ({
  type: UserActionTypes.SET_USER_DATA,
  payload
})
export const setUserLoading = (payload: IUserState['status']): ISetUserLoading => ({
  type: UserActionTypes.SET_LODAING_STATE,
  payload
})
export const fetchSingIn = (payload: IFormInputs): IFetchSingInUser => ({
  type: UserActionTypes.FETCH_SING_IN,
  payload
})
export const fetchSingUp = (payload: IFormInputsRegister): IFetchSingUp => ({
  type: UserActionTypes.FETCH_SING_UP,
  payload
})

export type UserAction = ISetUserData | ISetUserLoading | IFetchSingUp;