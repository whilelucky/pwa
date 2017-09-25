import { handle } from 'redux-pack';
import * as types from './types';

const initialState = {
  isLoading: false,
  results: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL: return handle(state, action, {
      start: (s) => ({ ...s, isLoading: true }),
      success: (s) => ({ ...s, results: payload.results }),
      failure: (s) => ({ ...s, error: payload.error }),
      finish: (s) => ({ ...s, isLoading: false }),
    });

    default:
      return state;
  }
};
