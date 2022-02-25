import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
// import session from "express-session";
import helmet from "helmet";
// import { createClient } from "redis";
import swaggerUi from "swagger-ui-express";
import config from "./config";
import { errorLogger, infoLogger } from "./logger";
import { handleError, processRequest } from "./middlewares";
import { options, uri } from "./mongodb";
import routes from "./routes";
import swaggerDocument from "./swagger.json";

const pino = require("pino-http")();

// let RedisStore = require("connect-redis")(session);

// let redisClient = createClient({
//   host: config.REDIS_HOST,
//   port: config.REDIS_PORT,
// });

// TODO: express-rate-limit options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});

// TODO: Express JS Configuration
const app = express();
app.use(express.json());

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: config.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false,
//     is_logged_in: false,
//     cookie: {
//       secure: true,
//       maxAge: 50000,
//     },
//   })
// );

let corsOptions = {
  origin: config.CLIENT_APP_URL,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// TODO: Necessary Packages
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(compression())
  .use(cors(corsOptions))
  .use(cookieParser())
  .use(helmet())
  .use(pino)
  .use(limiter);

// TODO: Info Logger Configuration
if (config.APP_ENVIRONMENT !== "development") app.use(infoLogger());

// TODO: Correlation Id
app.use(processRequest);

// TODO: Routes Configuration
routes(app);

// TODO: Swagger Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TODO: Error Logger Configuration
if (config.APP_ENVIRONMENT !== "development") app.use(errorLogger(uri, options));

// TODO: Error Handler
app.use(handleError);

export default app;
