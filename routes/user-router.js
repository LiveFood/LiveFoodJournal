'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const User = require('../model/user.js');
const basicAuth = require('../lib/basic-auth.js');
const bearerAuth = require('../lib/bearer-auth.js');


const authRouter = module.exports = new Router();
