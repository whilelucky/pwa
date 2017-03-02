import React, { PropTypes } from 'react';

const colClassNames = ['first', 'last', 'reverse'];

const getColModifiers = (props) => {
  const classNames = colClassNames.map((cn) => (props[cn] ? `col--${cn}` : ''));
  if (props.offset) classNames.push(`col--offset-${props.offset}`);
  if (props.size) classNames.push(`col--${props.size}`);
  return classNames.filter((cn) => cn).join();
};

const Col = ({ className, tagName, children, ...modifierProps }) =>
  React.createElement(tagName, {
    className: `${className ? `${className} col` : 'col'} ${getColModifiers(modifierProps)}`,
  }, children);

Col.propTypes = {
  className: PropTypes.string,
  tagName: PropTypes.string,
  size: PropTypes.number,
  offset: PropTypes.number,
  first: PropTypes.bool,
  last: PropTypes.bool,
  reverse: PropTypes.bool,
  children: PropTypes.node,
};

Col.defaultProps = {
  tagName: 'div',
};

export default Col;
