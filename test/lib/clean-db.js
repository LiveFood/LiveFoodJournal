'use strict';

const User = require('../../model/user.js');
const Journal = require('../../model/journal.js');
//const Profile = require('../../model/.profile.js'); comment to see if this will pass Travis as it shows up in error

module.exports = () => {

  return Promise.all([
    User.remove({}),
    //Profile.remove({}),
    Journal.remove({}),
  ]);
};
