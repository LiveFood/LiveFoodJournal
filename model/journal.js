'use strict';

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  authorid: {type: String, required: true, unique: true},
  mealConsumed: {type: String},
  mealFeedback: {type: String, default: 'It was good. '},
  feedbackDate: {type: Date, default: Date.now},
});

// module.exports = mongoose.model('Journal', journalSchema);
const Journal = module.exports = mongoose.model('Journal', journalSchema);


//
// echo '{"authorid":"Max", "mealConsumed":"burger", "mealFeedback":"tastes good!"}' | http POST http://localhost:3001/api/journal
