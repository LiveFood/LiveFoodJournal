'use strict';


const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const Express = require("express");
const UUID = require("uuid");
const BodyParser = require('body-parser');
const Bcrypt = require("bcrypt");
const {Router} = require('express');
const Profile = require('../model/profile.js');
const s3Upload = require('../lib/s3-upload.js');
const bearerAuth = require('../lib/bearer-auth.js');

const profileRouter = module.exports = new Router();



var app = Express();
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended : true }));


const parserRequest = require ('./parse-request');
//let router = module.exports = exports {};
//router.routes = {};
let methods = ['GET', 'PUT'];


methods.forEach ((method) => {
  router.routes [ method.toUpperCase () ] = {};
  router [ method.toLowerCase () ] = function (pathname, callback) {
    router.routes [method.toUpperCase () ] [ pathname ] = callback;
  };


  profileRouter.get('/api/profile/:name', jsonParser, (req, res, next) => {

    return Profile.findOne({name: req.params.name})
      .then(profile => {
        if(!profile) {return next(new Error('profile not found'));}
        return res.send(profile);
      })
      .catch(next);

  });

  profileRouter.put('/api/profile', bearerAuth, s3Upload('pic'), (req, res, next) => {

    req.body.profilePic = req.s3Data.Location;

    let options = {
      new: true,
      runValidators: true,
    };

    Profile.findOneAndUpdate({name: req.body.name}, req.body, options)
      .then(update => {
        return res.json(update);
      })
      .catch(next);
  });
