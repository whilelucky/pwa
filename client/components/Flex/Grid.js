import React, { PropTypes } from 'react';
import cx from 'classnames';

const Grid = ({ className, tag, fluid, children, ...restProps }) => {
  React.createElement(tag, {
    className: cx({
      container: !fluid,
      'container-fluid': fluid,
    }, className),
    ...restProps,
  }, children);
};

Grid.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string.isRequired,
  fluid: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

Grid.defaultProps = {
  tag: 'div',
  fluid: false,
};

export default Grid;
