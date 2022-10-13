// Modules

const winston = require("winston");

// Setup logger

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Export

module.exports = logger;
