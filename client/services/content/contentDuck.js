import { handle } from 'redux-pack';

const GET_TESTIMONIALS = 'GET_TESTIMONIALS';

const initialState = {
  isLoading: false,
  users: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TESTIMONIALS: return handle(state, action, {
      start: (s) => ({ ...s, isLoading: true }),
      success: (s) => ({ ...s, users: payload.results }),
      failure: (s) => ({ ...s, error: payload.error }),
      finish: (s) => ({ ...s, isLoading: false }),
    });

    default:
      return state;
  }
};

export const getUsers = (numberOfUsers) => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_TESTIMONIALS,
    promise: api.get('/api', {
      results: numberOfUsers,
      inc: 'name,location,picture',
    }),
  });
