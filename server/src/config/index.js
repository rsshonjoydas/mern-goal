import dotenv from "dotenv";

dotenv.config();

export default {
  CLIENT_APP_URL: process.env.CLIENT_APP_URL || "http://localhost:3000",
  APP_PORT: process.env.APP_PORT || 5000,
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || "production",

  // ? MongoDB localhost connection configuration
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
  MONGODB_NAME: process.env.MONGODB_NAME || "test",

  // ? Redis connection configuration
  REDIS_HOST: process.env.REDIS_HOST || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  // ? JWT secret token configuration
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  JWT_SECRET_TOKEN_EXPIRE: process.env.JWT_SECRET_TOKEN_EXPIRE,

  // ? jwt authentication token configuration
  JWT_ACTIVATION_TOKEN: process.env.JWT_ACTIVATION_TOKEN,
  JWT_ACTIVATION_TOKEN_EXPIRE: process.env.JWT_ACTIVATION_TOKEN_EXPIRE,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
  JWT_REFRESH_TOKEN_EXPIRE: process.env.JWT_REFRESH_TOKEN_EXPIRE,

  SESSION_SECRET: process.env.SESSION_SECRET,

  // ? OAuth2 authentication token configuration
  MAIL_SEND_CLIENT_ID: process.env.MAIL_SEND_CLIENT_ID,
  MAIL_SEND_CLIENT_SECRET: process.env.MAIL_SEND_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
};
