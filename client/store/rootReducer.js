import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnectReducer } from 'redux-connect';
import usersReducer from 'users/reducer';

export default combineReducers({
  reduxAsyncConnect: reduxAsyncConnectReducer,
  users: usersReducer,
});
