import nock from 'nock';
import { LIFECYCLE } from 'redux-pack';
import * as testHelpers from 'core/utils/testHelpers';
import * as types from './types';
import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('user/actions', () => {
  const store = testHelpers.mockStore();

  afterEach(() => {
    nock.cleanAll();
    store.clearActions();
  });

  it(`dispatches ${types.GET_ALL}`, async () => {
    const apiResult = { results: [{}, {}, {}] };

    nock('https://randomuser.me')
      .get('/api')
      .query({ results: 3, inc: 'name,location,picture' })
      .reply(200, apiResult);

    const expectedActions = [
      testHelpers.makeReduxPackAction(LIFECYCLE.START, {
        type: types.GET_ALL,
      }),
      testHelpers.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: types.GET_ALL,
        payload: apiResult,
        meta: { startPayload: undefined },
      }),
    ];

    await store.dispatch(actions.getAll());
    const dispatchedActions = store.getActions().map(testHelpers.removeReduxPackTransaction);

    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('users/reducer', () => {
  it('returns intialState', () => {
    const finalState = reducer(undefined, {});
    const expectedState = initialState;
    expect(finalState).toEqual(expectedState);
  });

  it(`sets users on ${types.GET_ALL}:success`, () => {
    const finalState = reducer(
      initialState,
      testHelpers.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: types.GET_ALL,
        payload: { results: [{}, {}, {}] },
      }),
    );

    const expectedState = {
      ...initialState,
      results: [{}, {}, {}],
    };

    expect(finalState).toEqual(expectedState);
  });

  it(`sets error on ${types.GET_ALL}:failure`, () => {
    const finalState = reducer(
      initialState,
      testHelpers.makeReduxPackAction(LIFECYCLE.FAILURE, {
        type: types.GET_ALL,
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
