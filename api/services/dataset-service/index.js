// Models

const AiModel = require("./models/ai-model");

const BotprofileModel = require("./models/botprofile-model");

const ComputersModel = require("./models/computers-model");

const ConversationsModel = require("./models/conversations-model");

const EmotionsModel = require("./models/emotions-model");

const FoodModel = require("./models/food-model");

const GossipModel = require("./models/gossip-model");

const GreetingsModel = require("./models/greetings-model");

const MoneyModel = require("./models/money-model");

const MoviesModel = require("./models/movies-model");

const PsychologieModel = require("./models/psychologie-model");

const ScienceModel = require("./models/science-model");

// Corpus

const corpusOne = require("./models/corpus/corpus-one");

// Brain

module.exports = {
  defaultAlgo: async (nlp, lang) => {
    // Intent
    const modelHook = [
      ...AiModel,
      ...BotprofileModel,
      ...ComputersModel,
      ...ConversationsModel,
      ...EmotionsModel,
      ...FoodModel,
      ...GossipModel,
      ...GreetingsModel,
      ...MoneyModel,
      ...MoviesModel,
      ...PsychologieModel,
      ...ScienceModel,
    ];

    for (let index = 0; index < modelHook.length; index++) {
      const { question, answer } = modelHook[index];

      const quest = question.toLowerCase();

      const categorie = question.replaceAll(" ", "");

      nlp.addDocument(lang, quest, categorie);

      nlp.addAnswer(lang, categorie, answer);
    }
  },
  intenseAlgo: async (nlp, lang) => {
    // Intent

    const modelHook = [...corpusOne];

    for (let index = 0; index < modelHook.length; index++) {
      const { intent, utterances, answers } = modelHook[index];

      for (let index = 0; index < utterances.length; index++) {
        nlp.addDocument(lang, utterances[index], intent);
      }

      for (let index = 0; index < answers.length; index++) {
        nlp.addAnswer(lang, intent, answers[index]);
      }
    }
  },
};
