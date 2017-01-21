import { handle } from 'redux-pack';

const GET_TESTIMONIALS = 'GET_TESTIMONIALS';

const initialState = {
  isLoading: false,
  testimonials: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TESTIMONIALS: return handle(state, action, {
      start: (s) => ({ ...s, isLoading: true }),
      success: (s) => ({ ...s, testimonials: payload.results }),
      failure: (s) => ({ ...s, error: payload.error }),
      finish: (s) => ({ ...s, isLoading: false }),
    });

    default:
      return state;
  }
};

export const getTestimonials = (numberOfTestimonials) => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_TESTIMONIALS,
    promise: api.get('/api', {
      results: numberOfTestimonials,
      inc: 'name,location,picture',
    }),
  });
