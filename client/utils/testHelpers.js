import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { middleware as reduxPack, KEY } from 'redux-pack';
import api from './api';

export const makeReduxPackAction = (lifecycle, { type, payload, meta = {} }) => ({
  type,
  payload,
  meta: {
    ...meta,
    [KEY.LIFECYCLE]: lifecycle,
  },
});

export const removeReduxPackTransaction = (action) => ({
  ...action,
  meta: {
    ...action.meta,
    'redux-pack/TRANSACTION': undefined,
  },
});

export const mockStore = configureMockStore([
  reduxThunk.withExtraArgument({ api }),
  reduxPack,
]);
