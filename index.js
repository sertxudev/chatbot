const Bot = require('./bot');
const express = require('express')();

const bot = new Bot(['en', 'es'], 'en');;

async function trainAndSave() {
  await bot.trainModel();
  bot.saveModel('./model.nlp')
}

async function startExpressServer() {
  express.get('/', (req, res) => {
    if(req.query.lang) bot.fallbackLocale = req.query.lang;
    res.sendFile('index.html', { root: __dirname + '/server' });
  });

  express.get('/api/', (req, res) => {
    bot.sendAnswer(req.query.q).then((response) => {
      res.send(response);
    })
  });

  express.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

(async () => {
  await trainAndSave();
  await startExpressServer();
  
  // await test();
})()


async function test() {
  console.log('Started testing...');
  await bot.sendAnswer('Hi')
  await bot.sendAnswer('hello')

  await bot.sendAnswer('I want to travel')
  await bot.sendAnswer('London')
  await bot.sendAnswer('Barcelona')
  await bot.sendAnswer('tomorrow')

  await bot.sendAnswer('Hola')

  await bot.sendAnswer('I want to travel to London')
  await bot.sendAnswer('Barcelona')
  await bot.sendAnswer('tomorrow')
  console.log('Finished testing!');
}
