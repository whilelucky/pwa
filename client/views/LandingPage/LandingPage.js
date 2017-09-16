import React from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import isEmpty from 'lodash/isEmpty';
import * as contentActionCreators from '../../services/content/contentDuck';
import Users from './Users/Users';
import './landingPage.css';

const LandingPage = ({
  content: { users },
}) => (
  <div className="landing-page">
    <h1>PWA</h1>
    <p>An opinionated progressive web app boilerplate</p>
    <Users users={users} />
  </div>
);

LandingPage.propTypes = {
  content: PropTypes.object.isRequired,
};

const beforeRouteEnter = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promise = isEmpty(getState().content.users)
      ? dispatch(contentActionCreators.getUsers(3)) : null;
    return __BROWSER__ ? null : promise;
  },
}];

const mapStateToProps = (state) => ({
  content: state.content,
});

export default asyncConnect(
  beforeRouteEnter,
  mapStateToProps,
)(LandingPage);
