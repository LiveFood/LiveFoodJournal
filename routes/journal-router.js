'use strict';

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const jsonParser = require('body-parser').json();
const promAll = require('bluebird').promisifyAll;
const MongoClient = promAll(mongodb.MongoClient);
const connection  = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
// const bearerAuth = require('../lib/bearer-auth.js');

//have body parser!!!
router.post('/api/journal', jsonParser, /*bearerAuth,*/ (req, res, next) => {//insert bearerAuth in there <-
  console.log('HERE IN POST');
  connection.then(db => {
    const col = promAll(db.collection('journal'));
    col.insertAsync(req.body)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    return db;
  });
});

router.get('/api/journal', (req, res, next) => {
//if req.query.id exists, our findQuery will be equal to an obj with _id=req.query.id
//if it doesnt exist, findQuery will be = emptry obj and we'll find all our note
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('journal'));
    col.findAsync(findQuery).then(cur => {
      promAll(cur).toArrayAsync()
        .then(res.send.bind(res))
        .catch(console.log)
        .catch(() => res.status(500).send('server error'));
    });
    return db;
  });
});

router.delete('/api/journal/:id', (req, res, next) => {
  console.log('we are in DEL and the ID is ' + req.params.id);
  let findQuery = req.params.id ? {_id: mongodb.ObjectId(req.params.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('journal'));
//trying to write DELETE by id
    });

});

module.exports = router;
