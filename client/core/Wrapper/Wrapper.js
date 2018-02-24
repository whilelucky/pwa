import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import performanceMark from '../../utils/performanceMark';
import './wrapper.css';

class Wrapper extends Component {
  componentDidMount() {
    performanceMark('first-interaction');
  }

  render() {
    const { route } = this.props;

    return (
      <div className="wrapper">
        <Helmet title="PWA" />
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

Wrapper.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Wrapper;
