import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import * as utils from 'core/utils';
import './wrapper.css';

class Wrapper extends Component {
  componentDidMount() {
    utils.performanceMark('firstInteraction');
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

export default Wrapper;
