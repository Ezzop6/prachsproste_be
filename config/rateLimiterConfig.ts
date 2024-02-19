import * as config from 'config';

const configSettings = config['rateLimiter'];

const rateLimiterConfig = {
  limit: configSettings.limit,
  ttl: configSettings.ttl,
};

export { rateLimiterConfig };
