import local from './local';
import development from './development';
import staging from './staging';
import production from './production';

const config = {
  local,
  development,
  staging,
  production,
};

export default config[__PWA_ENV__];
