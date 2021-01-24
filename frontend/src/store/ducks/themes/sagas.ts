import { call, put, takeEvery } from 'redux-saga/effects'
import { ThemesApi } from '../../../services/api/themesApi';
import { setTags, setTagsLoadingStatus, TagsActionType } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

function* fetchTagsRequest() {
  try {
     const items = yield call(ThemesApi.fetchTags);
     yield put(setTags(items));
  } catch (error) {
    yield put(setTagsLoadingStatus(LoadingState.ERROR))
  }
}

export function* tagsSaga() {
  yield takeEvery(TagsActionType.FETCH_TAGS, fetchTagsRequest)
}