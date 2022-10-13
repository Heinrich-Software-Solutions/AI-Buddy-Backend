// Modules

const Filter = require("bad-words");

const ai = require("../services/ai-service/index")();

const logger = require("../services/logging-service/index");

// Setup

module.exports = async ({ body, requester }, res) => {
  try {
    let { question } = body;

    const filter = new Filter();

    question = question.replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/]/, "");

    if (!question) {
      res.status(403);
      return res.json({ msg: "question needs to be defined" });
    }

    if (filter.isProfane(question)) {
      return res.json({
        mirror: filter.clean(question),
        msg: "This kind of questions are blocked, stop using such words!",
      });
    }

    ai.then(async (brain) => {
      const { answer } = await brain.process(question);

      return res.json({ owner: requester.owner, answer });
    });
  } catch (error) {
    res.status(500);
    logger.error(error.message);
    return res.json({ msg: "internal server error" });
  }
};

ai.catch((err) => {
  logger.error(err);
});
