import { call, put, takeEvery } from 'redux-saga/effects'
import { TweetsApi } from '../../../services/api/tweetsApi';
import { FetchAddTweetInterface, setTweets, setTweetsLoadingStatus, TweetsActionType, addTweet, setAddFormState, DeleteTweetInterface, deleteTweet } from './actionCreators';
import { AddFormLoading } from './state';
import { LoadingState } from '../../../interfaces/LoadingState';

function* fetchTweetsRequest() {
  try {
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingStatus(LoadingState.ERROR))
  }
}

function* fetchAddTweetRequest({payload}: FetchAddTweetInterface) {
  try {
    const item = yield call(TweetsApi.addTweet, payload);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddFormState(AddFormLoading.ERROR));
  }
}

function* fetchDeleteTweetRequest({payload}: DeleteTweetInterface) {
  try {
    yield call(TweetsApi.deleteTweet, payload);
  } catch (error) {
    console.log('Error delete tweet')
  }
}

export function* tweetsSaga() {
  yield takeEvery(TweetsActionType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeEvery(TweetsActionType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  yield takeEvery(TweetsActionType.DELETE_TWEET, fetchDeleteTweetRequest);
}