/* eslint-disable no-unused-expressions */
import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import theme, { injectBaseStyles } from '../../core/theme';

injectGlobal`${styledNormalize}`;
injectBaseStyles(theme);
injectGlobal`
  html {
    min-width: 320px;
  }

  *,
  *::after,
  *::before {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;
