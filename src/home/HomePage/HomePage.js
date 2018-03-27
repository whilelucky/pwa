import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as userActionCreators from '../../user/userActionCreators';
import UsersList from '../../user/UserList';
import Spacer from '../../core/Spacer';

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
      <Spacer margin={[2, 0]}>
        <div style={{ textAlign: 'center' }}>
          <h1>PWA</h1>
          <p>An opinionated progressive web app boilerplate</p>
          <UsersList />
        </div>
      </Spacer>
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
