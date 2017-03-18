import React, { PropTypes } from 'react';
import cx from 'classnames';

const Col = ({ className, tag, children, ...modifiers }) =>
  React.createElement(tag, {
    className: cx('col', {
      [`col--${modifiers.size}`]: modifiers.size,
      [`col--offset-${modifiers.offset}`]: modifiers.offset,
      'col--first': modifiers.first,
      'col--last': modifiers.last,
      'col--reverse': modifiers.reverse,
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
  tag: 'div',
};

export default Col;
