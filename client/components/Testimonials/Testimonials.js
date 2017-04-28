import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Row, Col } from '../Flex';
import LoaderHOC from '../hocs/LoaderHOC/LoaderHOC';
import './testimonials.css';

class Testimonials extends Component {
  state = {
    active: 1,
  };

  showTestimonial = (index) => () => {
    this.setState({ active: index });
  }

  render() {
    const { testimonials, loadTime } = this.props;
    const { active } = this.state;

    return testimonials.length ? (
      <section className="Testimonials">
        {loadTime ? (<small>Took: {loadTime}</small>) : null}
        <Row className="list" between>
          {
            testimonials.map(({ name, picture }, i) => (
              <Col key={name.first}>
                <img
                  className={cx('img', { 'img--active': active === i })}
                  src={picture.medium}
                  alt={name.first}
                  onClick={this.showTestimonial(i)}
                />
                <div className={cx('subheading-2 name', { 'name--visible': active === i })}>
                  {name.first}
                </div>
              </Col>
            ))
          }
        </Row>
        <p className="text-1">
          {testimonials[active].location.street}
        </p>
      </section>
    ) : (null);
  }
}

Testimonials.propTypes = {
  testimonials: PropTypes.array.isRequired,
  loadTime: PropTypes.string,
};

export default LoaderHOC('testimonials')(Testimonials);
