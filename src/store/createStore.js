import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { middleware as reduxPack } from 'redux-pack';
import { makeRequest } from '../utils/request';
import config from '../config';
import rootReducer from './rootReducer';

const middlewares = [
  reduxThunk.withExtraArgument({ request: makeRequest(config.apiUrl) }),
  reduxPack,
].filter(Boolean);

const storeEnhancers = [
  applyMiddleware(...middlewares),
  __BROWSER__ && __LOCAL__ && window.devToolsExtension && window.devToolsExtension(),
].filter(Boolean);

export default (initialState) =>
  createStore(
    rootReducer,
    initialState,
    compose(...storeEnhancers),
  );
