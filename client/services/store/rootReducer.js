import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnectReducer } from 'redux-connect';
import contentReducer from '../content/duck';

export default combineReducers({
  reduxAsyncConnect: reduxAsyncConnectReducer,
  content: contentReducer,
});
