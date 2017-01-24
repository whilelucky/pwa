import _ from 'lodash';
import React from 'react';
import './loaderHOC.css';

const LoaderHOC = (property) => (WrappedComponent) =>
  class Component extends React.Component {
    componentDidMount() {
      this.startTime = Date.now();
    }

    componentWillUpdate() {
      this.endTime = Date.now();
    }

    render() {
      const additionalProps = {
        loadTime: ((this.endTime - this.startTime) / 1000).toFixed(2),
      };

      return _.isEmpty(this.props[property]) ? (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      ) : (
        <WrappedComponent {...this.props} {...additionalProps} />
      );
    }
  };

export default LoaderHOC;
