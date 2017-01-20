import { handle } from 'redux-pack';

const GET_TESTIMONIALS = 'GET_TESTIMONIALS';

const initialState = {
  testimonials: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TESTIMONIALS:
      return handle(state, action, {
        success: (s) => ({ ...s, testimonials: payload.data.testimonials }),
        failure: (s) => ({ ...s, error: payload.error }),
      });
    default:
      return state;
  }
};

export const getTestimonials = () => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_TESTIMONIALS,
    promise: api.get('/v2/588261cc280000460ecbd455'),
  });
