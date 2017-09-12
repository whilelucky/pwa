import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Row = ({ className, tag, children, ...restProps }) =>
  React.createElement(tag, {
    className: cn('row', {
      'row--start': restProps.start,
      'row--center': restProps.center,
      'row--end': restProps.end,
      'row--top': restProps.top,
      'row--middle': restProps.middle,
      'row--bottom': restProps.bottom,
      'row--around': restProps.around,
      'row--between': restProps.between,
      'row--reverse': restProps.reverse,
    }, className),
  }, children);

Row.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string.isRequired,
  start: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  top: PropTypes.bool,
  middle: PropTypes.bool,
  bottom: PropTypes.bool,
  around: PropTypes.bool,
  between: PropTypes.bool,
  reverse: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Row.defaultProps = {
  tag: 'div',
};

export default Row;
