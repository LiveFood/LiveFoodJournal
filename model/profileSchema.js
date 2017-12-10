'use strict';


const User = require('../model/user.js');
const mongoose = require('mongoose');

//get username
//get email
//get image (stretch goal)

const information = new mongoose.Schema({
  username: {type: String. required: true},
  email: {type: String, required:true},
};


module.exports = mongoose.model('info', information);
