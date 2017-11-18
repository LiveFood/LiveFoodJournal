'use strict';

const Promise = require('bluebird');
const prom = Promise.promosify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const conenction = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
.then(db => {
  const col = promAll(db.collection('notes'));
  //when passing colsole.log, the parameter will be the result of insertAsync.
  col.insertAsync({noteBody: 'this is the 1st entry'})
  .then(console.log)
  .catch(console.log)
  return db;
})
