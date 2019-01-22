const fs = require('fs');
const express = require('express')();

const { NlpManager, Recognizer } = require('node-nlp');

const recognizer = new Recognizer();
recognizer.nlpManager.addLanguage('en');
// const manager = new NlpManager({ languages: ['en'] });
const THRESHOLD = 0.7;
// const THRESHOLD = 0;


async function trainNLP() {

  // Check if the model already exists and import it
  // if (fs.existsSync('./model.nlp')) {
  //   console.log('Model loaded from disk');
  //   recognizer.nlpManager.load('./model.nlp');
  //   return;
  // }

  console.log('Training model...');

  recognizer.nlpManager.addDocument('en', 'goodbye for now', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'goodbye', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'see you soon', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'bye bye take care', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'okay see you later', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'bye for now', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'i must go', 'greetings.bye');
  recognizer.nlpManager.addDocument('en', 'hello', 'greetings.hello');
  recognizer.nlpManager.addDocument('en', 'good morning', 'greetings.hello');
  recognizer.nlpManager.addDocument('en', 'good afternoon', 'greetings.hello');
  recognizer.nlpManager.addDocument('en', 'good evening', 'greetings.hello');
  recognizer.nlpManager.addDocument('en', 'hi', 'greetings.hello');
  recognizer.nlpManager.addDocument('en', 'howdy', 'greetings.hello');

  recognizer.nlpManager.addAnswer('en', 'greetings.hello', 'Hey there!');
  recognizer.nlpManager.addAnswer('en', 'greetings.hello', 'Welcome');
  recognizer.nlpManager.addAnswer('en', 'greetings.hello', 'Nice to see you again');
  recognizer.nlpManager.addAnswer('en', 'greetings.hello', 'Hi');
  recognizer.nlpManager.addAnswer('en', 'greetings.hello', 'Greetings!');
  recognizer.nlpManager.addAnswer('en', 'greetings.bye', 'Till next time');
  recognizer.nlpManager.addAnswer('en', 'greetings.bye', 'see you soon!');

  const fromEntity = recognizer.nlpManager.addTrimEntity('fromCity');
  fromEntity.addBetweenCondition('en', 'from', 'to', { skip: ['travel'] });
  fromEntity.addAfterLastCondition('en', 'from', { skip: ['travel'] });

  const toEntity = recognizer.nlpManager.addTrimEntity('toCity');
  toEntity.addBetweenCondition('en', 'to', 'from', { skip: ['travel'] });
  toEntity.addAfterLastCondition('en', 'to', { skip: ['travel'] });

  recognizer.nlpManager.slotManager.addSlot('travel', 'toCity', true, { en: 'Where do you want to go?' });
  recognizer.nlpManager.slotManager.addSlot('travel', 'fromCity', true, { en: 'From where you are traveling?' });
  recognizer.nlpManager.slotManager.addSlot('travel', 'date', true, { en: 'When do you want to travel?' });

  recognizer.nlpManager.addDocument('en', 'I want to travel from %fromCity% to %toCity% %date%', 'travel');
  recognizer.nlpManager.addAnswer('en', 'travel', 'You want to travel {{ date }} from {{ fromCity }} to {{ toCity }}');

  recognizer.nlpManager.addDocument('en', 'what are you doing', 'stuff.doing');
  recognizer.nlpManager.addAnswer('en', 'stuff.doing', 'I am doing stuff');

  recognizer.nlpManager.addDocument('en', 'how is stuff going', 'stuff.going');
  recognizer.nlpManager.addAnswer('en', 'stuff.going', 'Good');
  recognizer.nlpManager.addAnswer('en', 'stuff.going', 'Nice');
  recognizer.nlpManager.addAnswer('en', 'stuff.going', 'I prefer to not answer');

  recognizer.nlpManager.train().then(() => {
    recognizer.nlpManager.save('./model.nlp');
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

  console.log(incrementIdConversation)

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

  await sendAnswerBot('hello')

  await sendAnswerBot('I want to travel to London')
  await sendAnswerBot('Barcelona')
  await sendAnswerBot('tomorrow')

}

setTimeout(() => {
  test();
}, 4000);