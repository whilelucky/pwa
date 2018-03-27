import { injectGlobal } from 'styled-components';

export default (theme) => injectGlobal`
  html {
    box-sizing: border-box;
  }

  body {
    background: ${theme.color.greyLighter};
    color: ${theme.color.greyDarker};
    font-size: ${theme.fontSize.s};
    font-weight: ${theme.fontWeight.normal};
    font-family: ${theme.fontFamily.roboto}, system-ui, sans-serif;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol {
    padding: 0;
    margin: 0;
  }

  p {
    line-height: 1.5;
  }

  ul {
    list-style: none;
  }

  ol {
    list-style: decimal inside;
  }
`;
