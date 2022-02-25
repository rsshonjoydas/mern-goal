import mongoose from "mongoose";
import config from "./config";
import { logger } from "./logger";

export const uri = `mongodb://${config.MONGODB_HOST}:${config.MONGODB_PORT}/${config.MONGODB_NAME}`;

export const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

export const connectDBWithRetry = async () => {
  try {
    await mongoose.connect(uri, options);
    logger.info("Successfully connected to Database");
  } catch (error) {
    logger.error(error);
    setTimeout(connectDBWithRetry, 5000);
  }
};
