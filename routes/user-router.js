'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const User = require('../model/user.js');
const basicAuth = require('../lib/basic-auth.js');
const bearerAuth = require('../lib/bearer-auth.js');


const authRouter = module.exports = new Router();

authRouter.post('/api/register', jsonParser, (req, res, next) => {

  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/api/login', basicAuth, (req, res, next) => {

  req.user.createToken()
    .then(token => res.send(token))
    .catch(next);
});
