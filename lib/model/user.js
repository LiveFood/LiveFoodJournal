'use strict';


const mongoose = require('mongoose');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));


cont userSchema = new mongoose.Schema({
  username : {type : String,
              required : true,
              unique : true},

  password : {type : String,
              required : true}
});


userSchema.methods.generateHash = function(password) => {
  return bcrypt.hashAsync(password, 10)
  .then((hash) => {
    this.password = hash;
    return this;
  })
  .catch(err => {
    
  })
};
