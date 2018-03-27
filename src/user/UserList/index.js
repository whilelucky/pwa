import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./UserList' /* webpackChunkName: 'UserList' */),
  loading: () => <p>Loading users...</p>,
});
