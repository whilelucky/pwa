import React, { PropTypes } from 'react';

const getGridClasses = (props) => (props.fluid ? 'container-fluid' : 'container');

const Grid = ({ className, tagName, children, ...modifierProps }) => {
  React.createElement(tagName, {
    className: `${className ? `${className} container` : 'container'} ${getGridClasses(modifierProps)}`,
  }, children);
};

Grid.propTypes = {
  className: PropTypes.string,
  tagName: PropTypes.string,
  fluid: PropTypes.bool,
  children: PropTypes.node,
};

Grid.defaultProps = {
  tagName: 'div',
  fluid: false,
};

export default Grid;
