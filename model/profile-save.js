'use strict';


require('dotenv').config();
const information = require('../model/profile.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


module.exports = (information) => {

  let information = new information({
    'username': user.username,
    'email': user.email,
  });

  return profile.save()
    .then(information => {
      saveUser(information);
      return(information);
    })
    .catch(err => {
      console.log(err.message);
    });
};
