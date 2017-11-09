import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { asyncConnect } from 'redux-connect';
import { bindActionCreators, compose } from 'redux';
import * as userActionCreators from '../../services/user/userActionCreators';
import UsersList from './UserList/UserList';
import './landingPage.css';

class LandingPage extends React.Component {
  componentDidMount() {
    const { userActions } = this.props;
    userActions.getAll();
  }

  render() {
    return (
      <div className="landing-page">
        <h1>PWA</h1>
        <p>An opinionated progressive web app boilerplate</p>
        <UsersList />
      </div>
    );
  }
}

LandingPage.propTypes = {
  userActions: PropTypes.object.isRequired,
};

const beforeRouteEnter = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promise = isEmpty(getState().user.ids)
      ? dispatch(userActionCreators.getAll()) : null;
    return __BROWSER__ ? null : promise;
  },
}];

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreators, dispatch),
});

export default compose(
  asyncConnect(beforeRouteEnter, null, mapDispatchToProps),
)(LandingPage);
