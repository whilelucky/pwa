import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import theme from '../theme';
import performanceMark from '../../utils/performanceMark';
import './styles';

class Wrapper extends Component {
  componentDidMount() {
    performanceMark('first-interaction');
  }

  render() {
    const { route } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Helmet title="PWA" />
          {renderRoutes(route.routes)}
        </div>
      </ThemeProvider>
    );
  }
}

Wrapper.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Wrapper;
