const NODE_ENV = process.env.NODE_ENV

export const ENVS = {
  LOCAL: 'local',
  DEV: 'dev',
  PROD: 'prod',
};

export const config = {
  NODE_ENV,
  MONGO_DB: process.env.MONGO_DB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
