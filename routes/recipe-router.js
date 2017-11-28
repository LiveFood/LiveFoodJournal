'use strict';

const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Recipe = require('../model/recipe');

// mongoose.Promise = global.Promise;
// const mongoose = require('mongoose');

router.post('/api/recipe', jsonParser, /*bearerAuth,*/ (req, res, next) => {//insert bearerAuth in there <-
  // console.log('HERE IN recipe POST');
  let newRecipe = new Recipe(req.body);
  newRecipe.save()
    .then(data => res.send(data)) //sending data back
    .catch(err => next({statusCode: 500, message: 'Unable to make a recipe entry', error: err}));
});

//this GET will look for recipe/12345
router.get('./api/recipe/:id', (req, res, next) => {
  Recipe.findOne({_id: req.params.id})
    .then(recipe => res.send(recipe))
    .catch(err => next({error: err}));
});

//this will GET query ?_id=123 or no ID and show all
router.get('/api/recipe', (req, res, next) => {
  // console.log('HERE IN recipe GET');
  let findObj = req.query || {};
  Recipe.find(findObj)
    .then(recipe => res.send(recipe))
    .catch(err => next({error: err}));

});

router.patch('/api/recipe/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Recipe.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
    .then(data => res.send(data)) //sending data back
    .catch(err => next({error: err}));
});

router.put('/api/recipe/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Recipe.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data)) //sending data back
    .catch(err => next({error: err}));
});

router.delete('/api/recipe/:id', (req, res, next) => {
  console.log('we are in Recipe DEL and the ID is ' + req.params.id);
  Recipe.remove({_id: req.params.id})
    .then(data => res.send('The recipe entry with ID '+ req.params.id + ' has been deleted.'))
    .catch(err => next({error: err}));
});

module.exports = router;
