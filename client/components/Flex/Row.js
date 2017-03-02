import React, { PropTypes } from 'react';

const rowClassNames = ['start', 'center', 'end', 'top', 'middle', 'bottom', 'around', 'between', 'reverse'];

const getRowModifiers = (props) =>
  rowClassNames
    .map((cn) => (props[cn] ? `row--${cn}` : ''))
    .filter((cn) => cn)
    .join(' ');

const Row = ({ className, tagName, children, ...modifierProps }) =>
  React.createElement(tagName, {
    className: `${className ? `${className} row` : 'row'} ${getRowModifiers(modifierProps)}`,
  }, children);

Row.propTypes = {
  className: PropTypes.string,
  tagName: PropTypes.string,
  start: PropTypes.bool,
  center: PropTypes.bool,
  end: PropTypes.bool,
  top: PropTypes.bool,
  middle: PropTypes.bool,
  bottom: PropTypes.bool,
  around: PropTypes.bool,
  between: PropTypes.bool,
  reverse: PropTypes.bool,
  children: PropTypes.node,
};

Row.defaultProps = {
  tagName: 'div',
};

export default Row;
