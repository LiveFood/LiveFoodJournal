'use strict';

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userid: {type: mongoose.Types.ObjectId, required: true},
  name: {type: String, required: true },  /* unique name not required */
  // journal entries (array of objects)
  journals: [ {type: mongoose.Types.ObjectId, ref: 'Journal'} ],
});

var ObjectId = mongoose.Schema.Types.ObjectId;

// module.exports = mongoose.model('Profile', profileSchema);
const Profile = module.exports = mongoose.model('Profile', profileSchema);
