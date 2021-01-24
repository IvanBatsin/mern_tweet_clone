import { call, put, takeEvery } from 'redux-saga/effects'
import { TweetsApi } from '../../../services/api/tweetsApi';
import { FetchAddTweetInterface, setTweets, setTweetsLoadingStatus, TweetsActionType, addTweet, setAddFormState } from './actionCreators';
import { AddFromLoading } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';

function* fetchTweetsRequest() {
  try {
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingStatus(LoadingState.ERROR))
  }
}

function* fetchAddTweetRequest({payload: text}: FetchAddTweetInterface) {
  try {
    const item = yield call(TweetsApi.addTweet, text);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddFormState(AddFromLoading.ERROR))
  }
}

export function* tweetsSaga() {
  yield takeEvery(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest)
  yield takeEvery(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest)
}