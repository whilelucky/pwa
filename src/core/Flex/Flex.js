import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Flex = styled(({
  alignContent,
  alignItems,
  alignSelf,
  children,
  component,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  order,
  ...props
}) => React.createElement(component, props, children))`
  ${(p) => p.alignContent ? `align-content: ${p.alignContent};` : ''}
  ${(p) => p.alignSelf ? `align-self: ${p.alignSelf};` : ''}
  ${(p) => p.alignItems ? `align-items: ${p.alignItems};` : ''}
  ${(p) => p.display ? `display: ${p.display};` : ''}
  ${(p) => p.flex ? `flex: ${p.flex};` : ''}
  ${(p) => p.flexBasis ? `flex-basis: ${p.flexBasis};` : ''}
  ${(p) => p.flexDirection ? `flex-direction: ${p.flexDirection};` : ''}
  ${(p) => p.flexGrow ? `flex-grow: ${p.flexGrow};` : ''}
  ${(p) => p.flexShrink ? `flex-shrink: ${p.flexShrink};` : ''}
  ${(p) => p.flexWrap ? `flex-wrap: ${p.flexWrap};` : ''}
  ${(p) => p.justifyContent ? `justify-content: ${p.justifyContent};` : ''}
  ${(p) => p.order ? `order: ${p.order};` : ''}
`;

Flex.propTypes = {
  alignContent: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between', 'stretch']),
  alignItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
  alignSelf: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
  children: PropTypes.node,
  display: PropTypes.oneOf(['flex', 'inline-flex']),
  component: PropTypes.oneOf(['article', 'aside', 'div', 'figure', 'footer', 'header', 'main', 'nav', 'section']),
  flex: PropTypes.string,
  flexBasis: PropTypes.string,
  flexDirection: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  justifyContent: PropTypes.oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between']),
  order: PropTypes.number,
};

Flex.defaultProps = {
  component: 'div',
  display: 'flex',
};

export default Flex;
