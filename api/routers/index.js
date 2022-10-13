// Modules

const { Router } = require("express");

// Setup

const router = Router();

// Controllers

const uptimeController = require("../controllers/uptime.controller");

const processController = require("../controllers/process.controller");

// Routes

router.get("/server/uptime", uptimeController);

router.post("/ai/process-question", processController);

// Export

module.exports = router;
