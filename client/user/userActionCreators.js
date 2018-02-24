import * as userActionTypes from './userActionTypes';

export const getAll = () => (dispatch, getState, { api }) =>
  dispatch({
    type: userActionTypes.GET_ALL,
    promise: api.get('/api', {
      results: 3,
      inc: 'name,location,picture',
    }),
  });

export const getOne = () => (dispatch, getState, { api }) =>
  dispatch({
    type: userActionTypes.GET_ONE,
    promise: api.get('/api', {
      results: 1,
      inc: 'name,location,picture',
    }),
  });
