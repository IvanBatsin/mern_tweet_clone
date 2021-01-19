import { put, call, takeEvery } from 'redux-saga/effects';
import { authApi } from '../../../services/api/authApi';
import { setUserLoading, setUserData, IFetchSingInUser, UserActionTypes, IFetchSingUp } from './actionCreators';
import { LoadingState } from '../tweets/contracts/state';

export function* fetchSingInRequest({payload}: IFetchSingInUser){
  try {
    yield put(setUserLoading(LoadingState.LOADING));
    const data = yield call(authApi.singIn, payload);
    yield put(setUserData(data));
    window.localStorage.setItem('token', data.data.token)
  } catch (err) {
    console.log(err);
    yield put(setUserLoading(LoadingState.ERROR));
  }
}

export function* fetchSingUpRequest({payload}: IFetchSingUp){
  try {
    yield put(setUserLoading(LoadingState.LOADING));
    const data = yield call(authApi.singUp, payload);
    yield put(setUserLoading(LoadingState.LOADED));
  } catch (err) {
    console.log(err);
    yield put(setUserLoading(LoadingState.ERROR));
  }
}

export function* userSagas(){
  yield takeEvery(UserActionTypes.FETCH_SING_IN, fetchSingInRequest);
  yield takeEvery(UserActionTypes.FETCH_SING_UP, fetchSingUpRequest);
}