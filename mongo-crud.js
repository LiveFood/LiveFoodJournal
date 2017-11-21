'use strict';

const Promise = require('bluebird');
const prom = Promise.promosify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);

const connection = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
  .then(db => {
    const col = promAll(db.collection('notes'));
    //when passing colsole.log, the parameter will be the result of insertAsync.
    col.insertAsync({noteBody: 'this is the 1st entry'})
    col.insertAsync({noteBody: 'SECOND WHAT AAAA'})
    col.insertAsync({noteBody: 'THIRD, OH DAMN!!!'})
    col.insertAsync({noteBody: 'ANOTHER ONE'})
    // .then(console.log)
    // .then(db.close.bind(db))
      .catch(console.log)
      .catch(db.close.bind(db));
    return db;
  });

connection.then(db => {
  const col = promAll(db.collection('notes'));
  col.findAsync({}).then(cur => {
    promAll(cur).toArrayAsync()
      .then(console.log)
      .catch(console.log)
      .then(db.close.bind(db));
  });
});
// .then(db => db.close());

//result.ops[0] -> manipulate the 1st note because it will be an array with the length of 1.
