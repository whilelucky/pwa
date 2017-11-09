import { handle } from 'redux-pack';
import * as userTypes from './userTypes';
import * as userModel from './userModel';

export const initialState = {
  byId: {},
  ids: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userTypes.GET_ALL: return handle(state, action, {
      start: (s) => ({
        ...s,
        isLoading: true,
      }),
      success: (s) => ({
        ...s,
        ...userModel.normalize(payload.results),
      }),
      failure: (s) => ({
        ...s,
        error: payload.error,
      }),
      finish: (s) => ({
        ...s,
        isLoading: false,
      }),
    });

    default:
      return state;
  }
};
