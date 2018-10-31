const pkgJson = require('../../package.json');

export const environment = {
  production: false,
  debug: true,
  environment: 'LOCAL',
  version : pkgJson.version
};
