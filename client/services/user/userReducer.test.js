import nock from 'nock';
import { LIFECYCLE } from 'redux-pack';
import * as testHelpers from '../../utils/testHelpers';
import * as userTypes from './userTypes';
import * as userActionCreators from './userActionCreators';
import * as userModel from './userModel';
import reducer, { initialState } from './userReducer';

describe('user/userActionCreators', () => {
  const store = testHelpers.mockStore();

  afterEach(() => {
    nock.cleanAll();
    store.clearActions();
  });

  it(`dispatches ${userTypes.GET_ALL}`, async () => {
    const apiResult = { results: [{}, {}, {}] };

    nock('https://randomuser.me')
      .get('/api')
      .query({ results: 3, inc: 'name,location,picture' })
      .reply(200, apiResult);

    const expectedActions = [
      testHelpers.makeReduxPackAction(LIFECYCLE.START, {
        type: userTypes.GET_ALL,
      }),
      testHelpers.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: userTypes.GET_ALL,
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
    const finalState = reducer(undefined, {});
    const expectedState = initialState;
    expect(finalState).toEqual(expectedState);
  });

  it(`sets user on ${userTypes.GET_ALL}:success`, () => {
    const apiResult = [{}, {}, {}];

    const finalState = reducer(
      initialState,
      testHelpers.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: userTypes.GET_ALL,
        payload: { results: apiResult },
      }),
    );

    const expectedState = {
      ...initialState,
      ...userModel.normalize(apiResult),
    };

    expect(finalState).toEqual(expectedState);
  });

  it(`sets error on ${userTypes.GET_ALL}:failure`, () => {
    const finalState = reducer(
      initialState,
      testHelpers.makeReduxPackAction(LIFECYCLE.FAILURE, {
        type: userTypes.GET_ALL,
        payload: {
          error: {},
        },
      }),
    );

    const expectedState = {
      ...initialState,
      error: {},
    };

    expect(finalState).toEqual(expectedState);
  });
});
