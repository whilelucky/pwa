import nock from 'nock';
import { LIFECYCLE } from 'redux-pack';
import * as testHelpers from '../utils/testHelpers';
import * as userActionTypes from './userActionTypes';
import * as userActionCreators from './userActionCreators';
import * as userHelpers from './userHelpers';
import * as userReducer from './userReducer';

describe('user/userActionCreators', () => {
  const store = testHelpers.mockStore();

  afterEach(() => {
    nock.cleanAll();
    store.clearActions();
  });

  it(`dispatches ${userActionTypes.GET_ALL}`, async () => {
    const apiResult = { results: [{}, {}, {}] };

    nock('https://randomuser.me')
      .get('/api')
      .query({ results: 3, inc: 'name,location,picture' })
      .reply(200, apiResult);

    const expectedActions = [
      testHelpers.makeReduxPackAction(LIFECYCLE.START, {
        type: userActionTypes.GET_ALL,
      }),
      testHelpers.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: userActionTypes.GET_ALL,
        payload: apiResult,
        meta: { startPayload: undefined },
      }),
    ];

    await store.dispatch(userActionCreators.getAll());
    const dispatchedActions = store.getActions().map(testHelpers.removeReduxPackTransaction);

    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('user/userReducer', () => {
  it('returns intialState', () => {
    const finalState = userReducer.reducer(undefined, {});
    const expectedState = userReducer.initialState;
    expect(finalState).toEqual(expectedState);
  });

  it(`sets user on ${userActionTypes.GET_ALL}:success`, () => {
    const apiResult = [{}, {}, {}];

    const finalState = userReducer.reducer(
      userReducer.initialState,
      testHelpers.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: userActionTypes.GET_ALL,
        payload: { results: apiResult },
      }),
    );

    const expectedState = {
      ...userReducer.initialState,
      ...userHelpers.normalize(apiResult),
    };

    expect(finalState).toEqual(expectedState);
  });

  it(`sets error on ${userActionTypes.GET_ALL}:failure`, () => {
    const finalState = userReducer.reducer(
      userReducer.initialState,
      testHelpers.makeReduxPackAction(LIFECYCLE.FAILURE, {
        type: userActionTypes.GET_ALL,
        payload: {
          error: {},
        },
      }),
    );

    const expectedState = {
      ...userReducer.initialState,
      error: {},
    };

    expect(finalState).toEqual(expectedState);
  });
});
