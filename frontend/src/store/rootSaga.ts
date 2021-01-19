import {all} from 'redux-saga/effects';

// Sagas
import { tweetsSaga } from './ducks/tweets/sagas';
import { tagsSaga } from './ducks/themes/sagas';
import { FullTweetSaga } from './ducks/tweetFull/sagas';
import { userSagas } from './ducks/user/sagas';
import { randonUsersSagas } from './ducks/randomUsers/sagas';

export default function* rootSaga() {
  yield all([
    tweetsSaga(),
    tagsSaga(),
    FullTweetSaga(),
    userSagas(),
    randonUsersSagas()
  ]);
}