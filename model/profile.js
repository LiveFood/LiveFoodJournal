'use strict';

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userid: {type: String, required: true, unique: true},
  //userid type will be mongoose.schema.type.objectid required
  // name - unique not required
  // journal entries (array of objects)
  date: {type: Date, default: Date.now},
});

// module.exports = mongoose.model('Profile', profileSchema);
const Profile = module.exports = mongoose.model('Profile', profileSchema);
