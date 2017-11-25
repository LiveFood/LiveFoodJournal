'use strict';

const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
// const Profile = require('../model/profile');

// app.use(jsonParser.json());
const app = express();
app.use(jsonParser.urlencoded({ extended : true }));

const parserRequest = require ('./parse-request');
let methods = ['GET', 'GET', 'PUT', 'DELETE'];


methods.forEach ((method) => {
  router.routes [ method.toUpperCase () ] = {};
  router [ method.toLowerCase () ] = function (pathname, callback) {
    router.routes [method.toUpperCase () ] [ pathname ] = callback;
  };
});


module.exports = {
  get : (pathname, callback) => {
    router.GET [pathname] = callback;

  },

  get : (pathname, callback) => {
    router.GET [pathname] = callback;

  },

  put : (pathname, callback) => {
    router.PUT [pathname] = callback;

  },

  delete : (pathname, callback) => {
    router.DELETE [pathname] = callback;
  },

  router : (req, res) => {
    parserRequest (req)
      .then ((req) => {

        let handler = routerHandler [req.method] [req.url.pathname];

        if (handler) {
          return handler (req, res);

        } else {

          console.log ('error', req.url.pathname);
          res.writeHead (404);
          res.end ();
        }
      })

      .catch ((err => {
        console.log ('error invalid request', err);
        res.writeHead (400);
        res.end ();
      }));
  }};

module.exports = router;

//includes the downloaded dependencies and then initiates within project.

//POST /account – Create a new user profile with account information

//POST /login – Validate account information

//GET /account – Get account information

//POST /blog – Create a new blog entry associated to a user

//GET /blogs – Get all blog entries for a particular user

//npm install : couchbase / express / body-parser / uuid / bcryptjs
//to accept json data via post = body-parser
//uuid = will allow us to generate unique keys
//bcryptjs = will allow us to hash passwords to defer hack
