import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled(({
  component,
  children,
  ...props
}) => React.createElement(component, props, children))`
  ${(p) => p.color ? `color: ${p.theme.color[p.color]};` : ''}
  ${(p) => p.size ? `font-size: ${p.theme.fontSize[p.size]};` : ''}
  ${(p) => p.weight ? `font-weight: ${p.theme.fontWeight[p.weight]};` : ''}
  ${(p) => p.family ? `font-family: ${p.theme.fontFamily[p.family]};` : ''}
  ${(p) => p.truncate ? `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  ` : ''}
`;

Text.propTypes = {
  component: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  family: PropTypes.string,
  truncate: PropTypes.bool,
};

Text.defaultProps = {
  component: 'p',
};

export default Text;
