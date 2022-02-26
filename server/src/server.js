import app from "./app";
import config from "./config";
import { logger } from "./logger";
import { connectDBWithRetry } from "./mongodb";

// TODO: App Configuration
const { APP_PORT } = config;

app.listen(APP_PORT, async () => {
  // TODO: Database Connection
  await connectDBWithRetry();

  console.log(`App listening on port ${APP_PORT}`);
  logger.info(`App listening on port ${APP_PORT}`);
});
