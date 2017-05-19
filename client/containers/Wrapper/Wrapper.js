import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { analyticsActionCreators } from '../../redux/ducks';
import { helpers } from '../../../utils';
import './wrapper.css';

class Wrapper extends Component {
  componentDidMount() {
    helpers.performanceMark('firstInteraction');
    this.captureAnalytics();
  }

  captureAnalytics() {
    const { analyticsActions, location } = this.props;
    analyticsActions.recordPerformance(location.pathname);
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
  analyticsActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const beforeRouteEnter = [];

const mapStateToProps = false;

const mapDispatchToProps = (dispatch) => ({
  analyticsActions: bindActionCreators(analyticsActionCreators, dispatch),
});

export default asyncConnect(
  beforeRouteEnter,
  mapStateToProps,
  mapDispatchToProps,
)(Wrapper);
