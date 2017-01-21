import React from 'react';
import cx from 'classnames';
import './testimonials.css';

class Testimonials extends React.Component {
  state = {
    active: 1,
  };

  showTestimonial = (index) => () => {
    this.setState({ active: index });
  }

  render() {
    const { testimonials } = this.props;
    const { active } = this.state;

    return testimonials.length ? (
      <section className="Testimonials">
        <div className="container">
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
                  <div className={cx('subheading-1 name', { 'name--visible': active === i })}>
                    {name.first}
                  </div>
                </li>
              ))
            }
          </ul>
          <p className="text-1">
            { testimonials[active].location.street }
          </p>
        </div>
      </section>
    ) : (null);
  }
}

Testimonials.propTypes = {
  testimonials: React.PropTypes.array.isRequired,
};

export default Testimonials;
