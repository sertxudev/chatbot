const { Recognizer, Language } = require('node-nlp');
const trainingNLP = require('./training/_training');

const THRESHOLD = 0.7;
let incrementIdConversation = true;
let idConversation = 0;

const Bot = class {

  constructor(language, fallbackLang) {
    this.recognizer = new Recognizer();
    this.languageGuess = new Language();
    this.languages = language;
    this.manager = this.recognizer.nlpManager;
    this.manager.addLanguage(language);
    this.fallbackLocale = fallbackLang;
    console.log('Bot started!');
  }

  async trainModel() {
    console.log('Training started...');
    await trainingNLP(this.manager);
    await this.manager.train()
    console.log('Training finished!');
  }

  saveModel(filename) {
    console.log('Model saved!');
    this.manager.save(filename);
  }

  loadModel(filename) {
    if (fs.existsSync(filename)) {
      console.log('Model loaded from disk!');
      this.manager.load(filename);
    } else {
      console.log('The model requested doesn\'t exists')
    }
  }

  async sendAnswer(query) {
    var message = this.buildMessage(query);
    var result = await this.recognizer.recognize(message);
    incrementIdConversation = !(result && result.slotFill);
    const answer = result.score > THRESHOLD && result.answer ? result.answer : (result.locale === 'es') ? "Lo siento, no te he entendido" : "Sorry, I don't understand";
    console.log(result);
    return { locale: result.locale, message: answer };
  }

  buildMessage(query) {
    if (incrementIdConversation === true) idConversation++;
    return { locale: this.fallbackLocale, message: { address: { conversation: { id: 'conversation_' + idConversation } }, text: query } };
  }

}

module.exports = Bot