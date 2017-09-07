import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import contentReducer, * as contentActionCreators from './contentReducer/contentReducer';

export default combineReducers({
  reduxAsyncConnect,
  content: contentReducer,
});

export {
  contentReducer,
  contentActionCreators,
};
