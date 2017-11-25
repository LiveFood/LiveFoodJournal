'use strict';

const User = require('../../model/user.js');
const Profile = require('../../model/.profile.js');
const Journal = require('../../model/journal.js');

module.exports = () => {

  return Promise.all([
    User.remove({}),
    Profile.remove({}),
    Journal.remove({}),
  ]);
};
