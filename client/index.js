import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import './assets/css/core.css';
import Root from './components/Root/Root';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
