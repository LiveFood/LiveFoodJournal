'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.schema ({

  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  tokenSeed: {type: String, required: true, unique: true},

});

userSchema.methods.createPasswordHash = function (p) {

  return bcrypt.hash(p, 8)
    .then(hash => {
      this.passwordHash = hash;
      return this;
    });
};

userSchema.methods.comparePasswordHash = function (p) {

  return bcrypt.compare(p, this.passwordHash)
    .then(successful => {

      if(successful) {return this;}

      else {throw new Error('Access Denied, password mismatch');}

    });
};
