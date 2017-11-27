<<<<<<< HEAD
<<<<<<< HEAD
'use strict';

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var Express = require("express");
var UUID = require("uuid");
var BodyParser = require('body-parser');
var Bcrypt = require("bcrypt.js");

var app = Express();
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended : true }));

const parserRequest = require ('./parse-request');
//let router = module.exports = exports {};
//router.routes = {};
let methods = ['GET', 'GET', 'PUT', 'DELETE'];


methods.forEach ((method) => {
  router.routes [ method.toUpperCase () ] = {};
  router [ method.toLowerCase () ] = function (pathname, callback) {
    router.routes [method.toUpperCase () ] [ pathname ] = callback;
  };
});


module.exports = {
  get : (pathname, callback) => {
    route.GET [pathname] = callback;

  },

  get : (pathname, callback) => {
    route.GET [pathname] = callback;

  },

  put : (pathname, callback) => {
    route.PUT [pathname] = callback;

  },

  delete : (pathname, callback) => {
    route.DELETE [pathname] = callback;
  },

  route : (req, res) => {
    parserRequest (req)
    .then ((req) => {

      let handler = routeHandler [req.method] [req.url.pathname];

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
/*
//connection URL
var url = 'mongodb://localhost:27017/LiveFoodJournal';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("connected to server");

  insertDocuments(db, function() {
    updateDocument(db, function() {
      deleteDocument(db, function() {
        findDocuments(db, function() {
          db.close();

        });
      });
    });
  });
});


//get documents collection
var insertDocuments = function(db, callback) {
//insert some docs
  var collection = db.collection('documents');

  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}],

    function(err, result) {
      assert.equal(err, null);
      assert.equal(3 result.result.n);
      asssert.eual(3, result.ops.length);
      console.log("inserted 3 docs into db collection");
      callback(result);

  });
};


//update docs
var updateDocument = function(db, callback) {
  //get doc collection
  var collection = db.collection('documents');
  //update doc where a is 2, b equal to 1
  collection.updateOne({a : 2}, { $set : {b : 1} },
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("updated docs with field equal to 2");
      callback(result);
    });
};


//delete docs
var deleteDocument = function(db, callback) {
  //get docs collection
  var collection = db.collection('documents');
  //insert docs
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("removed docs with field equal to 3");
    callback(result);
  });
};


//find docs
var findDocuments = function(db, callback) {
  //get docs collection
  var collection = db.collection('documents');
  //find docs
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("found following docs");
    console.dir(docs);
    callback(docs);
  });
};

//result conatins result doc from mongodb
//ops contains docs inserted w added _id fields
// connection contains connection used to perform insert


/*
var server = app.listen(3000, () => {
  console.log ("Listening on port " + server.address().port
*/


//
// app.post("/account", (request, response) => {
//   if(!request.body.email) {
//     return response.status(401).send({ "message" : `email required` });
//
//   } else if (!request.body.password) {
//
//     return response.status(401).send({ "message" : `password required` });
//   }
//
//
//   var id = UUID.v4();
//   var account = {
//     "type" : "account",
//     "pid" : id,
//     "email" : request.body.email,
//     "password" : Bcrypt.hashSync(request.body.password, 10)
//   };
=======
// 'use strict';
>>>>>>> b7243ad2ad61aefce5992f442882208376e6c305
//
// var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// var Express = require("express");
// var UUID = require("uuid");
// var BodyParser = require("body-parser");
// var Bcrypt = require("bcrypt");
//
//
//
// const parserRequest = require ('./parse-request');
// //let router = module.exports = exports {};
// //router.routes = {};
// let methods = ['GET', 'GET', 'PUT', 'DELETE'];
//
//
// methods.forEach ((method) => {
//   router.routes [ method.toUpperCase () ] = {};
//   router [ method.toLowerCase () ] = function (pathname, callback) {
//     router.routes [method.toUpperCase () ] [ pathname ] = callback;
//   };
// });
//
//
// module.exports = {
//   get : (pathname, callback) => {
//     route.GET [pathname] = callback;
//
//   },
//
//   get : (pathname, callback) => {
//     route.GET [pathname] = callback;
//
//   },
//
//   put : (pathname, callback) => {
//     route.PUT [pathname] = callback;
//
//   },
//
//   delete : (pathname, callback) => {
//     route.DELETE [pathname] = callback;
//   },
//
//   route : (req, res) => {
//     parserRequest (req)
//     .then ((req) => {
//
//       let handler = routeHandler [req.method] [req.url.pathname];
//
//       if (handler) {
//         return handler (req, res);
//
//       } else {
//
//         console.log ('error', req.url.pathname);
//         res.writeHead (404);
//         res.end ();
//         }
//       })
//
//       .catch ((err => {
//         console.log ('error invalid request', err);
//         res.writeHead (400);
//         res.end ();
//       }));
//     }};
// /*
// //connection URL
// var url = 'mongodb://localhost:27017/LiveFoodJournal';
//
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("connected to server");
//
//   insertDocuments(db, function() {
//     updateDocument(db, function() {
//       deleteDocument(db, function() {
//         findDocuments(db, function() {
//           db.close();
//
//         });
//       });
//     });
//   });
// });
//
//
// //get documents collection
// var insertDocuments = function(db, callback) {
// //insert some docs
//   var collection = db.collection('documents');
//
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}],
//
//     function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3 result.result.n);
//       asssert.eual(3, result.ops.length);
//       console.log("inserted 3 docs into db collection");
//       callback(result);
//
//   });
// };
//
//
// //update docs
// var updateDocument = function(db, callback) {
//   //get doc collection
//   var collection = db.collection('documents');
//   //update doc where a is 2, b equal to 1
//   collection.updateOne({a : 2}, { $set : {b : 1} },
//     function(err, result) {
//       assert.equal(err, null);
//       assert.equal(1, result.result.n);
//       console.log("updated docs with field equal to 2");
//       callback(result);
//     });
// };
//
//
// //delete docs
// var deleteDocument = function(db, callback) {
//   //get docs collection
//   var collection = db.collection('documents');
//   //insert docs
//   collection.deleteOne({ a : 3 }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("removed docs with field equal to 3");
//     callback(result);
//   });
// };
//
//
// //find docs
// var findDocuments = function(db, callback) {
//   //get docs collection
//   var collection = db.collection('documents');
//   //find docs
//   collection.find({}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     assert.equal(2, docs.length);
//     console.log("found following docs");
//     console.dir(docs);
//     callback(docs);
//   });
// };
//
// //result conatins result doc from mongodb
// //ops contains docs inserted w added _id fields
// // connection contains connection used to perform insert
//
//
// /*
// var server = app.listen(3000, () => {
//   console.log ("Listening on port " + server.address().port
// */
//
//
// //
// // app.post("/account", (request, response) => {
// //   if(!request.body.email) {
// //     return response.status(401).send({ "message" : `email required` });
// //
// //   } else if (!request.body.password) {
// //
// //     return response.status(401).send({ "message" : `password required` });
// //   }
// //
// //
// //   var id = UUID.v4();
// //   var account = {
// //     "type" : "account",
// //     "pid" : id,
// //     "email" : request.body.email,
// //     "password" : Bcrypt.hashSync(request.body.password, 10)
// //   };
// //
// //
// //   var profile = request.body;
// //   profile.type = "profile";
// //   delete profile.password;
// //
// //   bucket.insert(id, profile, (error, result) => {
// //     if(error) {
// //       return response.status(500).send(error);
// //     }
// //
// //     bucket.insert(request.body.email, account (error, result) => {
// //       if(error) {
// //         bucket.remove(id);
// //         return response.status(500).send(error);
// //
// //       }
// //       response.send(result);
// //
// //     });
// //   });
// // });
// //
// //
// //
// // app.post("/login", (request, response) => {
// //   if(!request.body.email) {
// //     return response.status(401).send({ "message" : "email is required" });
// //
// //   } else if(!request.body.password) {
// //
// //     return response.status(401).send({ "message" : "password is required" });
// //
// //     }};
// //   });
// // });
//
//
// //includes the downloaded dependencies and then initiates within project.
//
// //POST /account – Create a new user profile with account information
//
// //POST /login – Validate account information
//
// //GET /account – Get account information
//
// //POST /blog – Create a new blog entry associated to a user
//
// //GET /blogs – Get all blog entries for a particular user
//
// //npm install : couchbase / express / body-parser / uuid / bcryptjs
// //to accept json data via post = body-parser
// //uuid = will allow us to generate unique keys
// //bcryptjs = will allow us to hash passwords to defer hack
=======
'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser');
const Profile = require('../model/profile.js');
const s3Upload = require('../lib/s3-upload.js');
const bearerAuth = require('../lib/bearer-auth.js');

const profileRouter = module.exports = new Router();

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
>>>>>>> 584fd040cc6d548091e8520bf345f9fd6f690c13
