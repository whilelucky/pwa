import React from 'react';
import cx from 'classnames';

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

    return (
      <section className="lp-testimonials">
        <div className="container">
          <ul className="row lp-testimonials__list">
            {
              testimonials.map(({ name, image_url: imageUrl }, i) => (
                <li
                  key={name}
                  className={cx('lp-testimonials__item', {
                    'lp-testimonials__item--active': active === i,
                  })}
                >
                  <img
                    className={cx('lp-testimonials__img', {
                      'lp-testimonials__img--active': active === i,
                    })}
                    src={`${imageUrl}?w=102&h=102&fm=pjpg&fit=crop`}
                    alt={name}
                    onClick={this.showTestimonial(i)}
                  />
                  <div
                    className={cx('subheading-1 lp-testimonials__user', {
                      'lp-testimonials__user--visible': active === i,
                    })}
                  >{name}</div>
                </li>
              ))
            }
          </ul>
          <p className="text--center lp-testimonials__text text-1">
            { testimonials[active].description }
          </p>
        </div>
      </section>
    );
  }
}

Testimonials.propTypes = {
  testimonials: React.PropTypes.array.isRequired,
};

export default Testimonials;
