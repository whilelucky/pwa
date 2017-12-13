import React from 'react';
import Loadable from 'react-loadable';
import importCss from '../../../utils/importCss';

export default Loadable({
  loader: () => {
    importCss('UserList');
    return import('./UserList' /* webpackChunkName: 'UserList' */);
  },
  // provide better UX by using a skeleton screen here instead of just text
  loading: () => <p>Loading the UserList component...</p>,
});
