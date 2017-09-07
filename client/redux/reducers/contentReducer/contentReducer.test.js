import nock from 'nock';
import { LIFECYCLE } from 'redux-pack';
import * as testService from '../../../../services/testService';
import contentReducer, * as contentActionCreators from './contentReducer';

const initialState = {
  isLoading: false,
  testimonials: [],
};

describe('contentActionCreators', () => {
  const store = testService.mockStore();

  afterEach(() => {
    nock.cleanAll();
    store.clearActions();
  });

  it('dispatches GET_TESTIMONIALS', async () => {
    const numberOfTestimonials = 3;
    const apiResult = { results: [{}, {}, {}] };

    nock('https://randomuser.me')
      .get('/api')
      .query({ results: numberOfTestimonials, inc: 'name,location,picture' })
      .reply(200, apiResult);

    const expectedActions = [
      testService.makeReduxPackAction(LIFECYCLE.START, {
        type: 'GET_TESTIMONIALS',
      }),
      testService.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: 'GET_TESTIMONIALS',
        payload: apiResult,
        meta: { startPayload: undefined },
      }),
    ];

    await store.dispatch(contentActionCreators.getTestimonials(numberOfTestimonials));
    const dispatchedActions = store.getActions().map(testService.removeReduxPackTransaction);

    expect(dispatchedActions).toEqual(expectedActions);
  });
});

describe('contentReducer', () => {
  it('returns intialState', () => {
    const finalState = contentReducer(undefined, {});
    const expectedState = initialState;
    expect(finalState).toEqual(expectedState);
  });

  it('sets testimonials on GET_TESTIMONIALS:success', () => {
    const finalState = contentReducer(
      initialState,
      testService.makeReduxPackAction(LIFECYCLE.SUCCESS, {
        type: 'GET_TESTIMONIALS',
        payload: { results: [{}, {}, {}] },
      }),
    );

    const expectedState = {
      ...initialState,
      testimonials: [{}, {}, {}],
    };

    expect(finalState).toEqual(expectedState);
  });

  it('sets error on GET_TESTIMONIALS:failure', () => {
    const finalState = contentReducer(
      initialState,
      testService.makeReduxPackAction(LIFECYCLE.FAILURE, {
        type: 'GET_TESTIMONIALS',
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
