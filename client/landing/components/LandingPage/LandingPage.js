import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { asyncConnect } from 'redux-connect';
import * as usersActions from 'users/actions';
import UsersList from 'users/components/UsersList/UsersList';
import './landingPage.css';

const LandingPage = () => (
  <div className="landing-page">
    <h1>PWA</h1>
    <p>An opinionated progressive web app boilerplate</p>
    <UsersList />
  </div>
);

const beforeRouteEnter = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promise = isEmpty(getState().users.results)
      ? dispatch(usersActions.getAll()) : null;
    return __BROWSER__ ? null : promise;
  },
}];

export default asyncConnect(
  beforeRouteEnter,
  null,
)(LandingPage);
