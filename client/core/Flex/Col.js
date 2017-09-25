import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Col = ({ className, tag, children, ...restProps }) =>
  React.createElement(tag, {
    className: cn('col', {
      [`col--${restProps.size}`]: restProps.size,
      [`col--offset-${restProps.offset}`]: restProps.offset,
      'col--first': restProps.first,
      'col--last': restProps.last,
      'col--reverse': restProps.reverse,
    }, className),
  }, children);

Col.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string.isRequired,
  size: PropTypes.number,
  offset: PropTypes.number,
  first: PropTypes.bool,
  last: PropTypes.bool,
  reverse: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Col.defaultProps = {
  className: '',
  tag: 'div',
  size: 0,
  offset: 0,
  first: false,
  last: false,
  reverse: false,
};

export default Col;
