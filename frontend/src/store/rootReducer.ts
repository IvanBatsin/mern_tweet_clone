import {combineReducers} from 'redux';

// Reducers
import { tweetsReducer } from './ducks/tweets/reducer';
import { tagsReducer } from './ducks/themes/reducer';
import { fullTweetReducer } from './ducks/tweetFull/reducer';
import { userReducer } from './ducks/user/reducer';
import { randomUsersReducer } from './ducks/randomUsers/reducer';

export const rootReducer =  combineReducers({
  tweets: tweetsReducer,
  themes: tagsReducer,
  tweet: fullTweetReducer,
  user: userReducer,
  users: randomUsersReducer
});