'use strict';

const Promise = require('bluebird');
const prom = Promise.promosify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const conenction = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
.then(db => {
  const col = promAll(db.collection('notes'));
  col.insertAsync()
})
