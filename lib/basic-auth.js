'use strict';

const User = require('../model/user.js');

module.exports = (req, res, next) => {

  let {authorization} = req.headers;

  if(!authorization) {
    return next(new Error('authorization failed, no auth provided'));
  }

  let encoded = authorization.split('Basic ')[1];
  if(!encoded) {
    return next(new Error('authorization failed, not encoded'));
  }

  let decoded = new Buffer(encoded, 'base64').toString();

  let [username, password] = decoded.split(':');
  if(!username || !password) {
    return next(new Error('authorization failed, missing username or password'));
  }

  User.findOne({username})
    .then(user => {
      if(!user) {return next(new Error('user does not exist'));}
      else {return user.comparePasswordHash(password);}
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => {
      next(new Error('basic auth failed to find user'));
    });
};
