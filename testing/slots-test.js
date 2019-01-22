const { NlpManager, ConversationContext, Recognizer, SlotManager } = require('node-nlp');

async function main() {
  // const manager = new NlpManager({ languages: ['en'] });
  // const context = new ConversationContext();
  // const slotmanager = new SlotManager();


  // const fromEntity = manager.addTrimEntity('fromCity');
  //       fromEntity.addBetweenCondition('en', 'from', 'to');
  //       fromEntity.addAfterLastCondition('en', 'from');

  // const toEntity = manager.addTrimEntity('toCity');
  //       toEntity.addBetweenCondition('en', 'to', 'from', { skip: ['travel'] });
  //       toEntity.addAfterLastCondition('en', 'to');

  // manager.slotManager.addSlot('travel', 'fromCity', true, { en: 'From where you are traveling?' });
  // manager.slotManager.addSlot('travel', 'toCity', true, { en: 'Where do you want to go?' });
  // manager.slotManager.addSlot('travel', 'date', true, { en: 'When do you want to travel?' });


  // manager.addDocument('en', 'I want to travel from %fromCity% to %toCity% %date%', 'travel');
  // await manager.train();

  // let result = await manager.process('en', 'I want to travel to Madrid tomorrow', context);
  // console.log(JSON.stringify(result, null, 2));

  // result = await manager.process('en', 'Valencia', context);
  // console.log(JSON.stringify(result, null, 2));

  const recognizer = new Recognizer();

  recognizer.nlpManager.addLanguage('en');
  
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

  await recognizer.nlpManager.train();


  const session = {
    locale: 'en',
    message: {
      address: {
        conversation: {
          id: 'a1b2c3',
        },
      },
      text: 'I want to travel to London',
    },
  };

  const session2 = {
    locale: 'en',
    message: {
      address: {
        conversation: {
          id: 'a1b2c3',
        },
      },
      text: 'Barcelona',
    },
  };

  const session3 = {
    locale: 'en',
    message: {
      address: {
        conversation: {
          id: 'a1b2c3',
        },
      },
      text: 'tomorrow',
    },
  };


  
  // manager.process('en', query, slotManager).then(result => {
  //   console.log(result.answer)
  // })
  
  var result = await recognizer.recognize(session);
  console.log(result.answer);
  
  var result2 = await recognizer.recognize(session2);
  console.log(result2.answer);

  var result3 = await recognizer.recognize(session3);
  console.log(result3.answer);

}

main();