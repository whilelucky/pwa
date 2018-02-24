import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Text from '../../core/Text';
import Flex from '../../core/Flex';
import Spacer from '../../core/Spacer';

const Image = styled.img`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  border: 3px solid transparent;
  border-color: ${(p) => p.isActive ? p.theme.color.primary : ''};
`;

class UsersList extends Component {
  state = {
    active: 1,
  };

  showUser = (index) => () => {
    this.setState({ active: index });
  }

  render() {
    const { users } = this.props;
    const { active } = this.state;

    return users.length ? (
      <Spacer margin={[7, 0]}>
        <div>
          <Flex>
            {
              users.map(({ name, picture }, i) => (
                <Flex key={name.first} flex="1" flexDirection="column">
                  <Spacer margin={1.5}>
                    <Image
                      src={picture.medium}
                      alt={name.first}
                      isActive={active === i}
                      onClick={this.showUser(i)}
                    />
                  </Spacer>
                  <Text>{name.first}</Text>
                </Flex>
              ))
            }
          </Flex>
          <Text>{users[active].location.street}</Text>
        </div>
      </Spacer>
    ) : null;
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  users: Object.values(state.$user.byId),
});

export default compose(
  connect(mapStateToProps),
)(UsersList);
