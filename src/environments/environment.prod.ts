const pkgJson = require('../../package.json');

export const environment = {
  production: true,
  debug: false,
  environment: 'PROD',
  version : pkgJson.version
};
