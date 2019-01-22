// const trainingES = require('./training_es');
// const trainingEN = require('./training_en');
const greetings = require('./greetings');

const trainingNLP = async function (manager) {
  // trainingES(manager);
  // trainingEN(manager);
  greetings(manager);
}

module.exports = trainingNLP