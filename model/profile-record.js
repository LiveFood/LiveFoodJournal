'use strict';


require('dotenv').config();
const superagent = require('superagent');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


module.exports = (user) => {
  return new Promise((resolve, reject) => {

    let username = user.name || 'donkeykong';
    let email = user.email || 'donkeykong@nes.com';


    console.log('retrieving username email');



  })
}
