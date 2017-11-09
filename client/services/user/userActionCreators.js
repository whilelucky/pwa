import * as userTypes from './userTypes';

export const getAll = () => (dispatch, getState, { api }) =>
  dispatch({
    type: userTypes.GET_ALL,
    promise: api.get('/api', {
      results: 3,
      inc: 'name,location,picture',
    }),
  });

export const getOne = () => (dispatch, getState, { api }) =>
  dispatch({
    type: userTypes.GET_ONE,
    promise: api.get('/api', {
      results: 1,
      inc: 'name,location,picture',
    }),
  });
