import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import Flex from '../../../components/Flex/Flex';
import LoaderHOC from '../../../components/LoaderHOC/LoaderHOC';
import * as userModel from '../../../services/user/userModel';
import './userList.css';

class UsersList extends Component {
  state = {
    active: 1,
  };

  showUser = (index) => () => {
    this.setState({ active: index });
  }

  render() {
    const { users, loadTime } = this.props;
    const { active } = this.state;

    return users.length ? (
      <section className="user">
        {
          loadTime ? (
            <small>Took: {loadTime}</small>
          ) : null
        }
        <Flex.Row className="user__list" between>
          {
            users.map(({ name, picture }, i) => (
              <Flex.Col key={name.first}>
                <img
                  className={cn('user__img', {
                    'user__img--active': active === i,
                  })}
                  src={picture.medium}
                  alt={name.first}
                  onClick={this.showUser(i)}
                />
                <div
                  className={cn('user__name', {
                    'user__name--visible': active === i,
                  })}
                >
                  {name.first}
                </div>
              </Flex.Col>
            ))
          }
        </Flex.Row>
        <p>{users[active].location.street}</p>
      </section>
    ) : null;
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  loadTime: PropTypes.string,
};

UsersList.defaultProps = {
  loadTime: '',
};

const mapStateToProps = (state) => ({
  users: userModel.getAll(state.user.ids, state.user.byId),
});

export default compose(
  connect(mapStateToProps),
  LoaderHOC('users'),
)(UsersList);
