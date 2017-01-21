import { createStore, compose, applyMiddleware } from 'redux';
import { default as reduxThunk } from 'redux-thunk';
import { middleware as reduxPack } from 'redux-pack';
import { createTracker as reduxSegment } from 'redux-segment';
import { api } from '../../utils';
import rootReducer from './rootReducer';

const middlewares = [
  reduxThunk.withExtraArgument({ api }),
  reduxPack,
];
if (__BROWSER__) {
  middlewares.push(reduxSegment());
}

const storeEnhancers = [
  applyMiddleware(...middlewares),
];
if (__BROWSER__ && __LOCAL__) {
  storeEnhancers.push(window.devToolsExtension ? window.devToolsExtension() : (f) => f);
}

export default (initialState) => createStore(
  rootReducer,
  initialState,
  compose(...storeEnhancers),
);
