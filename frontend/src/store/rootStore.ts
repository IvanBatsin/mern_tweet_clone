// @ts-ignore
import {compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';

// States
import { TweetsState } from './ducks/tweets/contracts/state';
import { TagsState } from './ducks/themes/state';
import { FullTweetState } from './ducks/tweetFull/state';
import { IUserState } from './ducks/user/state';
import { IRandomUsersState } from './ducks/randomUsers/state';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootStore {
  tweets: TweetsState,
  themes: TagsState,
  tweet: FullTweetState,
  user: IUserState,
  randomUsers: IRandomUsersState
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);