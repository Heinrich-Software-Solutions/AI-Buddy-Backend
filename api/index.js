// Modules

const cors = require("cors");

const helmet = require("helmet");

const express = require("express");

const history = require("connect-history-api-fallback");

const logger = require("./services/logging-service/index");

// Configurations

const config = require("../config");

// Setup

const server = express();

// Middlewares

server.use(cors());

server.use(helmet());

server.use(history());

server.use(express.json());

server.use(express.static(`${__dirname}/public`));

server.use(require("./middlewares/auth.middleware"));

// Routes

server.use("/api/v1", require("./routers/index"));

// Handlers

server.use((req, res) => {
  res.status(404);
  return res.json({ msg: "not found" });
});

server.use((err, req, res, next) => {
  res.status(500);
  logger.error(`SERVER ERROR: ${err}`);
  return res.json({ msg: "internal server error" });
});

// Start

server.listen(config.api.port, () => {
  logger.info(`API SERVER IS UP ON PORT: ${config.api.port}`);
});
