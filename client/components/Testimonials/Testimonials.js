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
      <section className="testimonials">
        {
          loadTime ? (
            <small>Took: {loadTime}</small>
          ) : null
        }
        <Row className="testimonials__list" between>
          {
            testimonials.map(({ name, picture }, i) => (
              <Col key={name.first}>
                <img
                  className={cx('testimonials__img', {
                    'testimonials__img--active': active === i,
                  })}
                  src={picture.medium}
                  alt={name.first}
                  onClick={this.showTestimonial(i)}
                />
                <div
                  className={cx('testimonials__name', {
                    'testimonials__name--visible': active === i,
                  })}
                >
                  {name.first}
                </div>
              </Col>
            ))
          }
        </Row>
        <p>{testimonials[active].location.street}</p>
      </section>
    ) : (null);
  }
}

Testimonials.propTypes = {
  testimonials: PropTypes.array.isRequired,
  loadTime: PropTypes.string,
};

export default LoaderHOC('testimonials')(Testimonials);
