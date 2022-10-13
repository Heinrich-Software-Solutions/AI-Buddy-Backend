// Modules

const fs = require("fs");

const { join } = require("path");

const logger = require("../logging-service/index");

const dataset = require("../dataset-service/index");

const { NlpManager, ConversationContext } = require("node-nlp");

const noAnswerModel = require("../dataset-service/models/no-answer-model");

// Variables

const trainset = join(`${__dirname}../../dataset-service/trained/dataset.json`);

// AI Brain

module.exports = async (lang = "en", training = false) => {
  try {
    const nlp = new NlpManager({ languages: [lang] });

    const context = new ConversationContext();

    if (training) {
      // Adds the utterances and intents for the NLP

      logger.info("Collecting data...");

      await dataset.defaultAlgo(nlp, lang);

      await dataset.intenseAlgo(nlp, lang);

      logger.info("Collecting done...");

      // Train the dataset

      logger.info("Training...");

      await nlp.save();

      await nlp.train();

      const data = nlp.export(true);

      fs.writeFileSync(trainset, data, { encoding: "utf8" });

      logger.info("Training done...");
    }

    if (!training) {
      const data = fs.readFileSync(trainset, "utf8");
      nlp.import(data);
    }

    return {
      process: async (question) => {
        try {
          const { answer } = await nlp.process(lang, question, context);

          if (!answer) {
            const elemID = Math.floor(Math.random() * noAnswerModel.length);
            return { answer: noAnswerModel[elemID].answer };
          }

          return { answer };
        } catch (error) {
          logger.error(`AI DAMAGE: ${error.message}`);
        }
      },
    };
  } catch (error) {
    logger.error(`AI DAMAGE: ${error.message}`);
  }
};
