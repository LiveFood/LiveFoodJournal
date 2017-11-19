'use strict';

const Promise = require('bluebird');
const prom = Promise.promosify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const db;

const conenction = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
  .then(db => {
    db = db;
    const col = promAll(db.collection('notes'));
    //when passing colsole.log, the parameter will be the result of insertAsync.
    col.insertAsync({noteBody: 'this is the 1st entry'})
    // .then(console.log)
    // .then(db.close.bind(db))
      .catch(console.log)
      .catch(db.close.bind(db))
      return col;
  });

connection.then(col =>{
  // const col = promAll(db.collection('notes'));
  prom(col.find({}).toArray)()
    .then(console.log)
})
.then(db.close.bind(db));



//result.ops[0] -> manipulate the 1st note because it will be an array with the length of 1.
