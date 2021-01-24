import { call, put, takeEvery } from 'redux-saga/effects'
import { TweetsApi } from '../../../services/api/tweetsApi';
import { setFullTweet, setFullTweetLoadingStatus, FullTweetActionType, FetchFullTweetActionInterface } from './actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';
import { Tweet } from '../../../interfaces/Tweet';

function* fetchFullTweetRequest({payload: tweetId}: FetchFullTweetActionInterface) {
  try {
     const item: Tweet = yield call(TweetsApi.fetchItemTweet, tweetId);
     yield put(setFullTweet(item));
  } catch (error) {
    yield put(setFullTweetLoadingStatus(LoadingState.ERROR))
  }
}

export function* FullTweetSaga() {
  yield takeEvery(FullTweetActionType.FETCH_FULL_TWEET, fetchFullTweetRequest)
}