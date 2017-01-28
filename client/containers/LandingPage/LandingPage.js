import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { contentActionCreators, analyticsActionCreators } from '../../redux/ducks';
import Testimonials from '../../components/Testimonials/Testimonials';
import './landingPage.css';

class LandingPage extends Component {
  componentDidMount() {
    this.captureAnalytics();
  }

  captureAnalytics = () => {
    const { analyticsActions } = this.props;
    analyticsActions.pageViewed('Landing');
  }

  render() {
    const {
      content: { testimonials },
    } = this.props;
    return (
      <div className="Landing-Page">
        <h1 className="heading-1">PWA</h1>
        <div className="subheading-2">An opinionated progressive web app boilerplate</div>
        <Testimonials testimonials={testimonials} />
      </div>
    );
  }
}

LandingPage.propTypes = {
  analyticsActions: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
};

const beforeRouteEnter = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promise = _.isEmpty(getState().content.testimonials)
      ? dispatch(contentActionCreators.getTestimonials(3))
      : null;
    return __BROWSER__ ? null : promise;
  },
}];

const mapStateToProps = (state) => ({
  content: state.content,
});

const mapDispatchToProps = (dispatch) => ({
  analyticsActions: bindActionCreators(analyticsActionCreators, dispatch),
});

export default asyncConnect(
  beforeRouteEnter,
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
