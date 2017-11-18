'use strict';



var Couchbase = require("couchbase");
var Express = require("express");
var UUID = require("uuid");
var BodyParser = require("body-parser");
var Bcrypt = require("bcryptjs");


var app = Express();
var N1qlQeury = Couchbase.N1qlQeury;


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended : true }));


var cluster = new Couchbase.Cluster("couchbase://localhost");
var bucket = cluster.openBucket("default", "");


var server = app.listen(3000, () => {
  console.log ("Listening on port " + server.address().port

});



app.post("/account", (request, response) => {
  if(!request.body.email) {
    return response.status(401).send({ "message" : `email required` });

  } else if (!request.body.password) {

    return response.status(401).send({ "message" : `password required` });
  }


  var id = UUID.v4();
  var account = {
    "type" : "account",
    "pid" : id,
    "email" : request.body.email,
    "password" : Bcrypt.hashSync(request.body.password, 10)
  };


  var profile = request.body;
  profile.type = "profile";
  delete profile.password;

  bucket.insert(id, profile, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }

    bucket.insert(request.body.email, account (error, result) => {
      if(error) {
        bucket.remove(id);
        return response.status(500).send(error);

      }
      response.send(result);

    });
  });
});



app.post("/login", (request, response) => {
  if(!request.body.email) {
    return response.status(401).send({ "message" : "email is required" });

  } else if(!request.body.password) {

    return response.status(401).send({ "message" : "password is required" });
  }

  bucket.get(request.body.email, (error, result) => {
    if(error) {
      return response.status(500).send(error);

    }
    if(!Bcrypt.compareSync(request.body.password, result.value.password)) {
      return response.status(500).send({ "message" : "invalid password" });
    }

    var session = {
      "type" : "session",
      "id" : UUID.v4(),
      "pid" : result.value.pid
    };


    bucket.insert(session.id, session, { "expiry" : 3600 }, (error, result) => {
      if(error) {
        return response.status(500).send(error);
      }
      response.send({ "sid" : session.id });

    });
  });
});
//includes the downloaded dependencies and then initiates within project.
