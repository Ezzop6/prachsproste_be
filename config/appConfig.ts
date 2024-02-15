import * as config from 'config';

const configSettings = config['app'];

const appConfig = {
  port: process.env.APP_PORT || configSettings.port,
  env: process.env.NODE_ENV || configSettings.NODE_ENV,
};

export { appConfig };
