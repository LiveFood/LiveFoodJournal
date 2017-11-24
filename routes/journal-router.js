'use strict';

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const jsonParser = require('body-parser').json();
const promAll = require('bluebird').promisifyAll;
const MongoClient = promAll(mongodb.MongoClient);
const connection  = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');

const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const Journal = require('../model/journal');
const Recipe = require('../model/recipe');

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/expressmongo', {useMongoClient: true});
// const bearerAuth = require('../lib/bearer-auth.js');

//have body parser!!!
router.post('/api/journal', jsonParser, /*bearerAuth,*/ (req, res, next) => {//insert bearerAuth in there <-
  console.log('HERE IN POST');
  let newJournal = new Journal(req.body);
  newJournal.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 500, message: 'Unable to make a journal entry', error: err}))

});

//this GET will look for journal/12345
router.get('/api/journal/:id', (req, res, next) => {
  Journal.findOne({_id: req.params.id})
    .then(journal => {
      // use the recipe id
      const recipeID = journal.recipeID;
      // console.log('recipe id is', recipeID);
      // to look up recipe
      Recipe.findOne({_id: recipeID})
        .then(recipe => {
          // get the name of the recipe
          const mealName = recipe.mealName;
          // console.log('mealname is ', mealName);
          // and add it to journal object
          const j = Object.assign({}, journal._doc);
          j.mealName = mealName;
          res.send(j);
        })
        .catch(err => next({error: err}));

    })
    .catch(err => next({error: err}));
});

//this will GET query ?_id=123 or no ID and show all
router.get('/api/journal', (req, res, next) => {
  console.log('HERE IN GET');
  let findObj = req.query || {};
  Journal.find(findObj)
    .then(journal => res.send(journal))
    .catch(err => next({error: err}));
});

router.patch('/api/journal/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Journal.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(data => res.send('patched successfully '))
    .catch(err => next({error: err}));
});

router.put('/api/journal/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Journal.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(data => res.send('PUT was a success!'))
    .catch(err => next({error: err}));
});

router.delete('/api/journal/:id', (req, res, next) => {
  console.log('we are in DEL and the ID is ' + req.params.id);
  Journal.remove({_id: req.params.id})
    .then(data => res.send('the journal entry with ID '+ req.params.id + ' has been deleted.'))
    .catch(err => next({error: err}));

  // let findQuery = req.params.id ? {_id: mongodb.ObjectId(req.params.id)} : {};
  // connection.then(db => {
  //   const col = promAll(db.collection('journal'));
  //   col.removeAsync(findQuery)
  //     .then(result => { //if/then statement to say if something got deleted or not
  //       res.send(result + ' I deleted journal id ' + req.params.id);
  //     })
  //     .catch((err) => res.status(500).send('server error ' + err));
  // });
});

module.exports = router;
