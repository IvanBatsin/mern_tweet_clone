import { put, call, takeEvery } from 'redux-saga/effects';
import { userApi } from '../../../services/api/userApi';
import { setRandomUsers,  } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

export function* fetchRandomUsers(){
  // try {
  //   const data = yield call(authApi.singIn, payload);
  //   yield put(setUserData(data));
  //   window.localStorage.setItem('token', data.data.token)
  // } catch (err) {
  //   console.log(err);
  //   yield put(setUserLoading(LoadingState.ERROR));
  // }
}

export function* randonUsersSagas(){
  // yield takeEvery(UserActionTypes.FETCH_SING_IN, fetchRandomUsers);
}