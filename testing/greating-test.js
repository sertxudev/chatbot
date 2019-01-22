const fs = require('fs');
const express = require('express')();

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'] });
// const THRESHOLD = 0.7;
const THRESHOLD = 0;
var slotManager = null;


function trainNLP() {

  // Check if the model already exists and import it
  // if (fs.existsSync('./model.nlp')) {
  //   console.log('Model loaded from disk');
  //   manager.load('./model.nlp');
  //   return;
  // }

  console.log('Training model...');

  manager.addDocument('en', 'goodbye for now', 'greetings.bye');
  manager.addDocument('en', 'bye bye take care', 'greetings.bye');
  manager.addDocument('en', 'okay see you later', 'greetings.bye');
  manager.addDocument('en', 'bye for now', 'greetings.bye');
  manager.addDocument('en', 'i must go', 'greetings.bye');
  manager.addDocument('en', 'hello', 'greetings.hello');
  manager.addDocument('en', 'hi', 'greetings.hello');
  manager.addDocument('en', 'howdy', 'greetings.hello');

  // Test Slots
  // const topicWorkRequest = manager.addTrimEntity('topic');
  // topicWorkRequest.addBetweenCondition('en', 'about', 'for');
  // topicWorkRequest.addAfterLastCondition('en', 'about');

  // manager.slotManager.addSlot('work.request', 'topic', true, { en: 'What do you want to give me a work about?' });
  // manager.slotManager.addSlot('work.request', 'when', true, { en: 'When do you want it done?' });

  manager.addDocument('en', 'I want to give you work about %topic% for %when%', 'work.request');

  const fromEntity = manager.addTrimEntity('fromCity');
        fromEntity.addBetweenCondition('en', 'from', 'to');
        fromEntity.addAfterLastCondition('en', 'from');

  const toEntity = manager.addTrimEntity('toCity');
        toEntity.addBetweenCondition('en', 'to', 'from', { skip: ['travel'] });
        toEntity.addAfterLastCondition('en', 'to');

  manager.slotManager.addSlot('travel', 'toCity', true, {en: 'Where do you want to go?',});
  manager.slotManager.addSlot('travel', 'fromCity', true, {en: 'From where you are traveling?',});
  manager.slotManager.addSlot('travel', 'date', true, {en: 'When do you want to travel?',});
  
  manager.addDocument('en','I want to travel from %fromCity% to %toCity% %date%','travel',);
  manager.addDocument('en','I want to travel to %toCity%','travel',);
  manager.addDocument('en','I want to travel from %fromCity%','travel',);
  manager.addDocument('en','I want to travel','travel',);
  manager.addAnswer('en','travel','You want to travel from {{ fromCity }} to {{ toCity }} {{ date }}',);




  manager.addAnswer('en', 'greetings.hello', 'Hey there!');
  manager.addAnswer('en', 'greetings.hello', 'Welcome');
  manager.addAnswer('en', 'greetings.hello', 'Hi');
  manager.addAnswer('en', 'greetings.hello', 'Greetings!');
  manager.addAnswer('en', 'greetings.bye', 'Till next time');
  manager.addAnswer('en', 'greetings.bye', 'see you soon!');


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

function sendAnswerBot(query) {
  return new Promise(function (resolve) {
    if(slotManager) manager.slotManager.load(slotManager);
    console.log(slotManager)
    // console.log(slotManager)
    manager.process('en', query, slotManager).then(result => {
      console.log(result.answer)
    })
    var foo = manager.slotManager.save();
    console.log(foo)
    slotManager = foo
    // manager.process('en', query, {}).then((result) => {
    //   const answer = result.score > THRESHOLD && result.answer ? result.answer : "Sorry, I don't understand";
    //   console.log(result)
    //   resolve(answer);
    //   slotManager = manager.slotManager.save();
    // });
  });
}