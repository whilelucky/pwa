import Wrapper from './core/Wrapper';
import NotFound from './core/NotFound';
import HomePage from './home/HomePage';

export default [{
  component: Wrapper,
  routes: [{
    path: '/',
    exact: true,
    name: 'HomePage',
    component: HomePage,
  }, {
    name: 'NotFound',
    component: NotFound,
  }],
}];
