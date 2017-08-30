import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { performanceMark } from '../../../services/utils';
import './wrapper.css';

class Wrapper extends Component {
  componentDidMount() {
    performanceMark('firstInteraction');
  }

  render() {
    const { children } = this.props;

    return (
      <div className="wrapper">
        <Helmet title="PWA" />
        {children}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

const beforeRouteEnter = [];

const mapStateToProps = false;

export default asyncConnect(
  beforeRouteEnter,
  mapStateToProps,
)(Wrapper);
