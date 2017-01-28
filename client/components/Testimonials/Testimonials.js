import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import LoaderHOC from '../../hocs/LoaderHOC/LoaderHOC';
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
        <div className="container">
          {isNaN(loadTime) ? null : <small>Took: {loadTime}s</small>}
          <ul className="row list">
            {
              testimonials.map(({ name, picture }, i) => (
                <li key={name.first}>
                  <img
                    className={cx('img', { 'img--active': active === i })}
                    src={picture.medium}
                    alt={name}
                    onClick={this.showTestimonial(i)}
                  />
                  <div className={cx('subheading-2 name', { 'name--visible': active === i })}>
                    {name.first}
                  </div>
                </li>
              ))
            }
          </ul>
          <p className="text-1">
            {testimonials[active].location.street}
          </p>
        </div>
      </section>
    ) : (null);
  }
}

Testimonials.propTypes = {
  testimonials: PropTypes.array.isRequired,
  loadTime: PropTypes.string,
};

export default LoaderHOC('testimonials')(Testimonials);
