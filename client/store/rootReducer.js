import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnectReducer } from 'redux-connect';
import userReducer from '../services/user/userReducer';

export default combineReducers({
  reduxAsyncConnect: reduxAsyncConnectReducer,
  user: userReducer,
});
