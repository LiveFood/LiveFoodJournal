'use strict';

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userid: {type: String, required: true, unique: true},

  feedbackDate: {type: Date, default: Date.now},
});

// module.exports = mongoose.model('Profile', profileSchema);
const Profile = module.exports = mongoose.model('Profile', profileSchema);
