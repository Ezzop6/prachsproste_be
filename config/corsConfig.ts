import * as config from 'config';

const allowedOrigins = [config['cors'].allowedOrigins, ...process.env.ALLOWED_ORIGINS.split(',')];

export const corsConfig = {
  origin: allowedOrigins,
  methods: config['cors'].methods,
  allowedHeaders: config['cors'].allowedHeaders,
};
