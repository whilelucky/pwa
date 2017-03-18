import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import './loaderHOC.css';

const LoaderHOC = (property) =>
  (WrappedComponent) =>
    class extends Component {
      componentDidMount() {
        this.startTime = moment();
      }

      componentWillUpdate() {
        this.endTime = moment();
      }

      render() {
        const additionalProps = {
          loadTime: this.endTime ? `${this.endTime.diff(this.startTime, 'ms')}ms` : null,
        };

        return isEmpty(this.props[property]) ? (
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
