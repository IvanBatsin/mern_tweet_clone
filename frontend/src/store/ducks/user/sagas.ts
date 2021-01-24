import { put, call, takeEvery } from 'redux-saga/effects';
import { userApi } from '../../../services/api/userApi';
import { setUserLoading, setUserData, IFetchSingInUser, UserActionTypes, IFetchSingUp } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

export function* fetchSingInRequest({payload}: IFetchSingInUser){
  try {
    yield put(setUserLoading(LoadingState.LOADING));
    const data = yield call(userApi.singIn, payload);
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
    const data = yield call(userApi.singUp, payload);
    yield put(setUserLoading(LoadingState.LOADED));
  } catch (err) {
    console.log(err);
    yield put(setUserLoading(LoadingState.ERROR));
  }
}

export function* fetchGetMe() {
  try {
    yield put(setUserLoading(LoadingState.LOADING));
    const data = yield call(userApi.getMe);
    yield put(setUserData(data.data));
    yield put(setUserLoading(LoadingState.LOADED));
  } catch (error) {
    yield put(setUserLoading(LoadingState.ERROR));
  }
}

export function* userSagas(){
  yield takeEvery(UserActionTypes.FETCH_SING_IN, fetchSingInRequest);
  yield takeEvery(UserActionTypes.FETCH_SING_UP, fetchSingUpRequest);
  yield takeEvery(UserActionTypes.GET_ME, fetchGetMe);
}