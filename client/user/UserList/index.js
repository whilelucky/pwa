import React from 'react';
import Loadable from 'react-loadable';
import importCss from '../../utils/importCss';

export default Loadable({
  loader: () => {
    importCss('UserList');
    return import('./UserList' /* webpackChunkName: 'UserList' */);
  },
  loading: () => <p>Loading users...</p>,
});
