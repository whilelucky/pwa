import { handle } from 'redux-pack';
import * as userActionTypes from './userActionTypes';
import * as userHelpers from './userHelpers';

export const initialState = {
  byId: {},
  ids: [],
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActionTypes.GET_ALL:
      return handle(state, action, {
        success: (s) => ({
          ...s,
          ...userHelpers.normalize(payload.results),
        }),
        failure: (s) => ({
          ...s,
          error: payload.error,
        }),
      });

    default:
      return state;
  }
};
