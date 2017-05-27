import { createStore, compose, applyMiddleware } from 'redux';
import { default as reduxThunk } from 'redux-thunk';
import { middleware as reduxPack } from 'redux-pack';
import api from '../../services/api';
import rootReducer from './rootReducer';

const middlewares = [
  reduxThunk.withExtraArgument({ api }),
  reduxPack,
];

const storeEnhancers = [
  applyMiddleware(...middlewares),
  __BROWSER__ && __LOCAL__ && window.devToolsExtension ? window.devToolsExtension() : (f) => f,
];

export default (initialState) => createStore(
  rootReducer,
  initialState,
  compose(...storeEnhancers),
);
