const fs = require('fs');
const express = require('express')();

const { Recognizer } = require('node-nlp');

const recognizer = new Recognizer();
const manager = recognizer.nlpManager;
manager.addLanguage('en');

const THRESHOLD = 0.7;

// import { trainingNLP } from './training'

async function trainNLP() {

  // Check if the model already exists and import it
  if (fs.existsSync('./model.nlp')) {
    console.log('Model loaded from disk');
    manager.load('./model.nlp');
    return;
  }

  console.log('Training model...');

  trainingNLP();

  manager.train().then(() => {
    manager.save('./model.nlp');
  });

}

trainNLP();

express.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/server' });
});

express.get('/api/', (req, res) => {
  sendAnswerBot(req.query.q).then((response) => {
    res.send(response);
  })
});

express.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

incrementIdConversation = true;
idConversation = 0;

function buildMessage(query) {
  if (incrementIdConversation === true) idConversation++;

  var message = {
    locale: 'en',
    message: {
      address: {
        conversation: {
          id: 'conversation_' + idConversation
        }
      },
      text: query,
    },
  };

  return message;
}

const sendAnswerBot = async (query) => {
  // return new Promise(function (resolve) {

  var message = buildMessage(query);

  var result = await recognizer.recognize(message);
  incrementIdConversation = !(result && result.slotFill);

  console.log(message.message, result.answer, incrementIdConversation);
  // recognizer.recognize(message).then((err, result) => {
  //   console.log(message.message, result);
  // });

  // recognizer.recognize(message, (err, result) => {
  //   console.log(JSON.stringify(message))
  //   const answer = result.score > THRESHOLD && result.answer ? result.answer : "Sorry, I don't understand";
  //   resolve(answer)
  // });
  // });
}


async function test() {
  await sendAnswerBot('Hi')
  await sendAnswerBot('hello')

  await sendAnswerBot('I want to travel to London')
  await sendAnswerBot('Barcelona')
  await sendAnswerBot('tomorrow')

  await sendAnswerBot('Hola')

  await sendAnswerBot('I want to travel to London')
  await sendAnswerBot('Barcelona')
  await sendAnswerBot('tomorrow')
}

setTimeout(() => {
  test();
}, 4000);