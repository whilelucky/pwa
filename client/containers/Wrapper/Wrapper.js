import React from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { analyticsActionCreators } from '../../redux/ducks';
import { performanceMark } from '../../utils/helpers';
import './wrapper.css';

class Wrapper extends React.Component {
  componentDidMount() {
    performanceMark('firstInteraction');
    this.captureAnalytics();
  }

  captureAnalytics() {
    const { analyticsActions, location } = this.props;
    analyticsActions.recordPerformance(location.pathname);
  }

  render() {
    const { children } = this.props;

    return (
      <div id="wrapper" className="wrapper">
        <Helmet title="PWA" />
        {children}
      </div>
    );
  }
}

Wrapper.propTypes = {
  children: React.PropTypes.element.isRequired,
  analyticsActions: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};

const beforeRouteEnter = [];

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch) => ({
  analyticsActions: bindActionCreators(analyticsActionCreators, dispatch),
});

export default asyncConnect(
  beforeRouteEnter,
  mapStateToProps,
  mapDispatchToProps,
)(Wrapper);
