import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Row, Col } from '../../../components/Flex';
import LoaderHOC from '../../../components/LoaderHOC/LoaderHOC';
import './users.css';

class Users extends Component {
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
      <section className="users">
        {
          loadTime ? (
            <small>Took: {loadTime}</small>
          ) : null
        }
        <Row className="users__list" between>
          {
            users.map(({ name, picture }, i) => (
              <Col key={name.first}>
                <img
                  className={cn('users__img', {
                    'users__img--active': active === i,
                  })}
                  src={picture.medium}
                  alt={name.first}
                  onClick={this.showUser(i)}
                />
                <div
                  className={cn('users__name', {
                    'users__name--visible': active === i,
                  })}
                >
                  {name.first}
                </div>
              </Col>
            ))
          }
        </Row>
        <p>{users[active].location.street}</p>
      </section>
    ) : (null);
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loadTime: PropTypes.string,
};

export default LoaderHOC('users')(Users);
