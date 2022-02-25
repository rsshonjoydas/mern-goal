import dayjs from "dayjs";
import expressWinston from "express-winston";
import pino from "pino";
import pretty from "pino-pretty";
import winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";
import "winston-mongodb";

const getMessage = (req) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

const mongoErrorTransport = (uri, options) =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: "meta",
    options,
  });

const elasticsearchOptions = {
  level: "info",
  clientOpts: { node: "http://localhost:9200" },
  indexPrefix: "log-elasticsearch",
};

const esTransport = new ElasticsearchTransport(elasticsearchOptions);

export const infoLogger = () =>
  expressWinston.logger({
    transports: [new winston.transports.Console(), esTransport],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: getMessage,
  });

export const errorLogger = (uri, options) =>
  expressWinston.errorLogger({
    transports: [new winston.transports.Console(), mongoErrorTransport(uri, options), esTransport],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
  });

const stream = pretty({
  colorize: true,
});

export const logger = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format("DD MMMM YYYY, hh:mm:ss A")}"`,
  },
  stream
);
