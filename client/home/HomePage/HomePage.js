import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as userActionCreators from '../../user/userActionCreators';
import UsersList from '../../user/UserList';
import './homePage.css';

class HomePage extends React.Component {
  static componentWillServerRender = ({ store }) =>
    isEmpty(store.getState().$user.ids)
      ? store.dispatch(userActionCreators.getAll()) : null

  componentDidMount() {
    const { $user, userActions } = this.props;
    if (isEmpty($user.ids)) {
      userActions.getAll();
    }
  }

  render() {
    return (
      <div className="home-page">
        <h1>PWA</h1>
        <p>An opinionated progressive web app boilerplate</p>
        <UsersList />
      </div>
    );
  }
}

HomePage.propTypes = {
  $user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  $user: state.$user,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreators, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);
