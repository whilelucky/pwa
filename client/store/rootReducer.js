import { combineReducers } from 'redux';
import * as userReducer from '../user/userReducer';

export default combineReducers({
  $user: userReducer.reducer,
});
