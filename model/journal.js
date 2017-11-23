'use strict';

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  authorName: {type: String, required: true, unique: true},
  mealConsumed: {type: String},
  feedbackDate: {type: Date, default: Date.now},
  mealFeedback: {type: String, default: 'It was good. '},
});

module.exports = mongoose.model('Journal', journalSchema);
