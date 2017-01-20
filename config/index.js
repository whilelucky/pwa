import defaultConfig from './default';
import localConfig from './local';
import developmentConfig from './development';
import stagingConfig from './staging';
import productionConfig from './production';

const config = {
  local: {
    ...defaultConfig,
    ...localConfig,
  },
  development: {
    ...defaultConfig,
    ...developmentConfig,
  },
  staging: {
    ...defaultConfig,
    ...stagingConfig,
  },
  production: {
    ...defaultConfig,
    ...productionConfig,
  },
};

export default config[__PWA_ENV__];
