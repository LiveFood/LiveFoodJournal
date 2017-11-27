'use strict';

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userid: {type: mongoose.Types.ObjectId, required: true},
  name: {type: String, required: true },  /* unique name not required */
  photoURI: {type: String, minlength: 1},
  journals: [ {type: mongoose.Types.ObjectId, ref: 'Journal'} ],
  recipes: [ {type: mongoose.Types.ObjectId, ref: 'Recipe'} ],
});

const Profile = module.exports = mongoose.model('Profile', profileSchema);
