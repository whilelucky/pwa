import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { contentActionCreators, analyticsActionCreators } from '../../redux/ducks';
import Testimonials from '../../components/Testimonials/Testimonials';
import './landingPage.css';

class LandingPage extends React.Component {
  componentDidMount() {
    const { content, contentActions } = this.props;
    if (_.isEmpty(content.testimonials)) contentActions.getTestimonials();
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
      <div className="landing-page">
        <h1 className="heading-1">PWA Boilerplate</h1>
        <Testimonials testimonials={testimonials} />
      </div>
    );
  }
}

LandingPage.propTypes = {
  contentActions: React.PropTypes.object.isRequired,
  analyticsActions: React.PropTypes.object.isRequired,
  content: React.PropTypes.object.isRequired,
};

const beforeRouteEnter = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promise = _.isEmpty(getState().content.testimonials)
      ? dispatch(contentActionCreators.getTestimonials())
      : null;
    return __BROWSER__ ? null : promise;
  },
}];

const mapStateToProps = (state) => ({
  content: state.content,
});

const mapDispatchToProps = (dispatch) => ({
  contentActions: bindActionCreators(contentActionCreators, dispatch),
  analyticsActions: bindActionCreators(analyticsActionCreators, dispatch),
});

export default asyncConnect(
  beforeRouteEnter,
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
