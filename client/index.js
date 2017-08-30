import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import configureStore from './redux/configureStore';
import './css/core.css';
import routes from './routes';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router
      routes={routes}
      history={browserHistory}
      render={(props) => <ReduxAsyncConnect {...props} />}
      onUpdate={() => window.scrollTo(0, 0)}
    />
  </Provider>,
  document.getElementById('root'),
);
