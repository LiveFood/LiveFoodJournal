'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

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


userSchema.methods.createTokenSeed = function () {

  return new Promise((res, rej) => {
    let tries = 1;

    let _tokenSeedCreate = () => {

      this.tokenSeed = crypto.randomBytes(32).toString('hex');
      this.save()
        .then(() => res(this))
        .catch(() => {

          if(tries < 1) {return rej(new Error('failed to create token seed'));}
          else{tries--;}

          _tokenSeedCreate();
        });
    };

    _tokenSeedCreate();
  });
};

userSchema.methods.createToken = function () {

  return this.createTokenSeed()
    .then(() => jwt.sign({tokenSeed: this.tokenSeed}, process.env.APP_SECRET));
};

const User = module.exports = mongoose.model('user', userSchema);

User.create = function (data) {

  let password = data.password;
  delete data.password;

  return new User (data).createPasswordHash(password)
    .then(user => user.createToken());
};
