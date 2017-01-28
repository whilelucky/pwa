import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from '../../routes';

const Root = ({ store }) => (
  <Provider store={store} key="provider">
    <Router
      render={(props) => <ReduxAsyncConnect {...props} />}
      history={browserHistory}
      routes={routes}
      onUpdate={() => window.scrollTo(0, 0)}
    />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
