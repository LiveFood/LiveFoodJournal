'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user.js');
const universalify = require('universalify');

module.exports = (req, res, next) => {

  let {authorization} = req.headers;
  if(!authorization) {
    return next(new Error('authorization failed, no req headers'));
  }

  let bearerToken = authorization.split('Bearer ')[1];
  if(!bearerToken) {
    return next(new Error('no token provided'));
  }

  universalify.fromCallback(jwt.verify)(bearerToken, process.argv.APP_SECRET)
    .then(decoded => {
      return User.findOne({tokenSeed: decoded.tokenSeed});
    })
    .then(user => {
      if(!user) {return next(new Error('user not found'));}
      req.user = user;
      next();
    })
    .catch(next);
};
