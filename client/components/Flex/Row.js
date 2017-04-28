import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Row = ({ className, tag, children, ...modifiers }) =>
  React.createElement(tag, {
    className: cx('row', {
      'row--start': modifiers.start,
      'row--center': modifiers.center,
      'row--end': modifiers.end,
      'row--top': modifiers.top,
      'row--middle': modifiers.middle,
      'row--bottom': modifiers.bottom,
      'row--around': modifiers.around,
      'row--between': modifiers.between,
      'row--reverse': modifiers.reverse,
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
