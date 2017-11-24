'use strict';

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userID: {type: String, required: true, unique: true},
  recipeID: {type: String},
  mealFeedback: {type: String, default: 'It was good. '},
  feedbackDate: {type: Date, default: Date.now},
});

// module.exports = mongoose.model('Journal', journalSchema);
const Journal = module.exports = mongoose.model('Journal', journalSchema);


// echo '{"userID":"JOE", "recipeID":"5a1889b6d28381266e76c3dc", "mealFeedback": "very good" }' | http PATCH http://localhost:3001/api/journal/5a1890ac44f89427798110eb
//
// recipedID is the ID of a particular recipe and PATCH http://blachblah/journal/journalid that we're patching
