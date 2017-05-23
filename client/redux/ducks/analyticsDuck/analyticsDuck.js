import { EventTypes } from 'redux-segment';

const ANALYTICS_RECORD_PERFORMANCE = 'ANALYTICS_RECORD_PERFORMANCE';
const ANALYTICS_PAGE_VIEWED = 'ANALYTICS_PAGE_VIEWED';

export const recordPerformance = (pathname) => (dispatch) => {
  const performanceProperties = (
    window.performance
    && window.performance.getEntriesByType
    && window.performance.getEntriesByType('mark')
      .reduce((obj, mark) => ({
        ...obj,
        [mark.name]: mark.startTime,
      }), {})
  ) || {};
  dispatch({
    type: ANALYTICS_RECORD_PERFORMANCE,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: 'Record Performance',
          properties: {
            ...performanceProperties,
            pathname,
          },
        },
      },
    },
  });
};

export const pageViewed = (page, properties = {}) => (dispatch) => {
  dispatch({
    type: ANALYTICS_PAGE_VIEWED,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: `${page} Page Viewed`,
          properties: {
            ...properties,
          },
        },
      },
    },
  });
};
