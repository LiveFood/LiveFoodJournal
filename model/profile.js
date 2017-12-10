'use strict';



const mongoose = require('mongoose');
const user = require('../model/profile.js');


profile.get("/account", (request, response) => {
  if(!request.body.username) {
    return response.status(401).send({ "message": "a username required"});
  } else if (!request.body.email) {
    return response.status(401).send({ "message": "an email required"});
  }

  var id = UUID();
  var account = {
    "type": "account",
    "username" request.body.username,
    "email" request.body.email
  };

  var profile = request.body;
  profile.type = "profile";
  bucket.insert(id, profile, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    bucket.insert(request.body.email, account, (error, result) => {
      if(error) {
        bucket.remove(id);
        return response.status(500).send(error);
      }
      response.send(result);
    });
  });
});
