'use strict';

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  mealConsumed: {type: String},
  mealFeedback: {type: String, default: 'It was good. '},
  feedbackDate: {type: Date, default: Date.now},
});

const Journal = module.exports = mongoose.model('Journal', journalSchema);
