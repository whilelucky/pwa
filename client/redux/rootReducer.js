import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import {
  contentReducer,
} from './ducks';

export default combineReducers({
  reduxAsyncConnect,
  content: contentReducer,
});
