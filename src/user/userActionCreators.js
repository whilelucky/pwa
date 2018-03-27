import * as userActionTypes from './userActionTypes';

export const getAll = () => (dispatch, getState, { request }) =>
  dispatch({
    type: userActionTypes.GET_ALL,
    promise: request.get('/api', {
      results: 3,
      inc: 'name,location,picture',
    }),
  });

export const getOne = () => (dispatch, getState, { request }) =>
  dispatch({
    type: userActionTypes.GET_ONE,
    promise: request.get('/api', {
      results: 1,
      inc: 'name,location,picture',
    }),
  });
