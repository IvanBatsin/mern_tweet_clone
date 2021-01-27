import { Action } from 'redux';
import { IUserState } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';
import { IFormInputs } from '../../../pages/singIn/components/LoginModal';
import { IFormInputsRegister } from '../../../pages/singIn/components/RegisterPopup';
import { IUser } from '../../../interfaces/User';

export enum UserActionTypes {
  SET_USER_DATA = 'user/SET_USER_DATA',
  SET_LODAING_STATE = 'user/SET_LODAING_STATE',
  FETCH_SING_IN = 'user/FETCH_SING_IN',
  FETCH_SING_UP = 'user/FETCH_SING_UP',
  GET_ME = 'user/GET_ME',
  USER_SIGNOUT = 'user/USER_SIGNOUT',
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
export interface IGetMe extends Action<UserActionTypes> {
  type: UserActionTypes.GET_ME
}
export interface IUserSignOut extends Action<UserActionTypes> {
  type: UserActionTypes.USER_SIGNOUT
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
export const getMe = (): IGetMe => ({
  type: UserActionTypes.GET_ME
})
export const userSignOut = (): IUserSignOut => ({
  type: UserActionTypes.USER_SIGNOUT
})

export type UserAction = ISetUserData | ISetUserLoading | IFetchSingUp | IGetMe | IUserSignOut;