import Loadable from 'react-loadable';
import importCss from '../../utils/importCss';

export default Loadable({
  loader: () => {
    importCss('HomePage');
    return import('./HomePage' /* webpackChunkName: 'HomePage' */);
  },
  loading: () => null,
});
