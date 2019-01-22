const trainingEN = (manager) => {

    const fromEntity = manager.addTrimEntity('fromCity');
          fromEntity.addBetweenCondition('en', 'from', 'to', { skip: ['travel'] });
          fromEntity.addAfterLastCondition('en', 'from');
          fromEntity.addBetweenCondition('es', 'desde', 'a');
          fromEntity.addAfterLastCondition('es', 'desde');

    const toEntity = manager.addTrimEntity('toCity');
          toEntity.addBetweenCondition('en', 'to', 'from');
          toEntity.addAfterLastCondition('en', 'to');
          toEntity.addBetweenCondition('es', 'desde', 'a');
          toEntity.addAfterLastCondition('es', 'a');

    manager.slotManager.addSlot('travel', 'toCity', true, { en: 'Where do you want to go?', es: '¿Dónde quieres ir?' });
    manager.slotManager.addSlot('travel', 'fromCity', true, { en: 'From where you are traveling?', es: '¿Desde dónde vas a viajar?' });
    manager.slotManager.addSlot('travel', 'date', true, { en: 'When do you want to travel?', es: '¿Cuándo quieres viajar?' });

    manager.addDocument('es', 'Quiero viajar desde %fromCity% a %toCity% %date%', 'travel');
    manager.addDocument('en', 'I want to travel from %fromCity% to %toCity% %date%', 'travel');
    manager.addAnswer('es', 'travel', 'Quieres viajar {{ date }} desde {{ fromCity }} a {{ toCity }}');
    manager.addAnswer('en', 'travel', 'You want to travel {{ date }} from {{ fromCity }} to {{ toCity }}');
  

    manager.addDocument('en', 'what are you doing', 'stuff.doing');
    manager.addAnswer('en', 'stuff.doing', 'I am doing stuff');

    manager.addDocument('en', 'how is stuff going', 'stuff.going');
    manager.addAnswer('en', 'stuff.going', 'Good');
    manager.addAnswer('en', 'stuff.going', 'Nice');
    manager.addAnswer('en', 'stuff.going', 'I prefer to not answer');


  // const fromEntity = manager.addTrimEntity('fromCity');
  // fromEntity.addBetweenCondition('en', 'from', 'to', { skip: ['travel'] });
  // fromEntity.addAfterLastCondition('en', 'from', { skip: ['travel'] });

  // const toEntity = manager.addTrimEntity('toCity');
  // toEntity.addBetweenCondition('en', 'to', 'from', { skip: ['travel'] });
  // toEntity.addAfterLastCondition('en', 'to', { skip: ['travel'] });

  // manager.slotManager.addSlot('travel', 'toCity', true, { en: 'Where do you want to go?' });
  // manager.slotManager.addSlot('travel', 'fromCity', true, { en: 'From where you are traveling?' });
  // manager.slotManager.addSlot('travel', 'date', true, { en: 'When do you want to travel?' });

  // manager.addDocument('en', 'I want to travel from %fromCity% to %toCity% %date%', 'travel');
  // manager.addAnswer('en', 'travel', 'You want to travel {{ date }} from {{ fromCity }} to {{ toCity }}');

  console.log('English training completed!')
}

module.exports = trainingEN