const trainingES = (manager) => {

  /**
   * Welcome greatings
   */
  manager.addDocument('es', 'hola', 'greetings.hello');
  manager.addDocument('es', 'hey', 'greetings.hello');
  manager.addDocument('es', 'buenas', 'greetings.hello');

  manager.addAnswer('es', 'greetings.hello', 'Hola');
  manager.addAnswer('es', 'greetings.hello', 'Hey');
  manager.addAnswer('es', 'greetings.hello', 'Buenas');

  /**
   * Help message
   */
  manager.addDocument('es', 'necesito ayuda', 'need.help');
  manager.addDocument('es', '¿puedes ayudarme?', 'need.help');
  manager.addAnswer('es', 'need.help', '¿En qué puedo ayudarte?');

  /**
   * Ask for question
   */
  manager.addDocument('es', '¿puedo hacerte una pregunta?', 'greetings.ask');
  manager.addDocument('es', '¿te puedo preguntar una cosa?', 'greetings.ask');
  manager.addDocument('es', '¿te puedo preguntar algo?', 'greetings.ask');
  manager.addAnswer('es', 'greetings.ask', 'Pregúntame cualquier cosa, intentaré ayudarte...');
  manager.addAnswer('es', 'greetings.ask', '¡Pregúntame lo que quieras!');
  manager.addAnswer('es', 'greetings.ask', 'Claro, sin problema');

  /**
   * Travel request
   */

  console.log('Spanish training completed!')
}

module.exports = trainingES;