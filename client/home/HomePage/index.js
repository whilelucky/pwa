import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./HomePage' /* webpackChunkName: 'HomePage' */),
  loading: () => null,
});
