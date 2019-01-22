const greetings = (manager) => {

  /** Hello intents */
  // English
  manager.addDocument('en', 'hello', 'greetings.hello');
  manager.addDocument('en', 'hi', 'greetings.hello');
  manager.addAnswer('en', 'greetings.hello', 'Hi!');
  manager.addAnswer('en', 'greetings.hello', 'Hi, what can I do for you?');
  manager.addAnswer('en', 'greetings.hello', 'Hi there!');
  manager.addAnswer('en', 'greetings.hello', 'Hey there!');
  manager.addAnswer('en', 'greetings.hello', 'Hello');
  manager.addAnswer('en', 'greetings.hello', 'Nice to see you again');
  manager.addAnswer('en', 'greetings.hello', 'Greetings!');
  // Spanish
  manager.addDocument('es', 'hola', 'greetings.hello');
  manager.addDocument('es', 'buenas', 'greetings.hello');
  manager.addAnswer('es', 'greetings.hello', '¡Hola!');
  manager.addAnswer('es', 'greetings.hello', 'Hola, ¿Qué puedo hacer por ti?');
  manager.addAnswer('es', 'greetings.hello', 'Encantado de volver a verte.');

  /** Howdy intent */
  // English
  manager.addDocument('en', 'howdy', 'greetings.howdy');
  manager.addAnswer('en', 'greetings.howdy', 'Howdy, partner');
  manager.addAnswer('en', 'greetings.howdy', 'And a howdy-doo to you too');
  manager.addAnswer('en', 'greetings.howdy', 'Howdy back at you');
  manager.addAnswer('en', 'greetings.howdy', 'Howdy');
  // Spanish
  manager.addDocument('es', 'saludos', 'greetings.howdy');
  manager.addAnswer('es', 'greetings.howdy', '¡Saludos!');
  manager.addAnswer('es', 'greetings.howdy', 'Saludos, compañero');
  manager.addAnswer('es', 'greetings.howdy', 'Y un saludo para ti también');
  manager.addAnswer('es', 'greetings.howdy', 'Saludos a ti también');
  manager.addAnswer('es', 'greetings.howdy', 'Saludos');

  /** Bye intents */
  // English
  manager.addDocument('en', 'bye', 'greetings.bye');
  manager.addDocument('en', 'goodbye', 'greetings.bye');
  manager.addDocument('en', 'bye for now', 'greetings.bye');
  manager.addAnswer('en', 'greetings.bye', 'talk to you later');
  manager.addAnswer('en', 'greetings.bye', 'bye for now');
  manager.addAnswer('en', 'greetings.bye', 'goodbye');
  manager.addAnswer('en', 'greetings.bye', 'take care');
  manager.addAnswer('en', 'greetings.bye', 'Ok, bye');
  manager.addAnswer('en', 'greetings.bye', 'Bye');
  manager.addAnswer('en', 'greetings.bye', 'see you later');
  manager.addAnswer('en', 'greetings.bye', 'See you later, alligator');
  manager.addAnswer('en', 'greetings.bye', 'You now where to find me');

  manager.addDocument('en', 'see you soon', 'greetings.see_you_soon');
  manager.addAnswer('en', 'greetings.see_you_soon', 'Take care');
  manager.addAnswer('en', 'greetings.see_you_soon', 'Sounds goot');
  
  manager.addDocument('en', 'see you later', 'greetings.see_you_later');
  manager.addAnswer('en', 'greetings.see_you_later', 'See you!');

  manager.addDocument('en', 'see you later alligator', 'greetings.see_you_later_alligator');
  manager.addAnswer('en', 'greetings.see_you_later_alligator', 'In a while crocodile');
  // Spanish
  // TODO

}

module.exports = greetings