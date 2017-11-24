'use strict';

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  authorid: {type: String, required: true},
  mealName: {type: String, required: true},
  ingredients: [{type: String, required: true}],
  cookingTime: {type: String},
  cookingLevel: {type: String, default: 'Beginner '},
  recipeDate: {type: Date, default: Date.now},
});

const Recipe = module.exports = mongoose.model('Recipe', recipeSchema);
// console.log(Recipe);
//remove console log and linter for Recipe will freak out, why?
