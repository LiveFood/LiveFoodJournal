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
  let
}
