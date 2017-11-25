'use strict';

const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const Journal = require('../model/journal');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/expressmongo', {useMongoClient: true});
// const bearerAuth = require('../lib/bearer-auth.js');
// uncomment that for user integration ^ and uncomment in POST , PATCH, PUT

router.post('/api/journal', jsonParser, /*bearerAuth, */ (req, res, next) => { //insert bearerAuth in there <-
  console.log('HERE IN POST');
  let newJournal = new Journal(req.body);
  newJournal.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 500, message: 'Unable to make a journal entry', error: err}))

});

//this GET will look for journal/12345
router.get('/api/journal/:id', (req, res, next) => {
  Journal.findOne({_id: req.params.id})
    .then(journal => res.send(journal))
    .catch(err => next({error: err}));
});

//This will GET query ?_id=123 or no ID and show all
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
});

module.exports = router;
