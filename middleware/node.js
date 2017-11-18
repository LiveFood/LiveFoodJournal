'use strict';



var validate = function(request, response, next) {
  var authHeader = request.headers["authorization"];

  if(authHeader) {
    bearerToken = authHeader.split(" ");

    if(bearerToken.length == 2) {
      bucket.get(bearerToken[1], (error, result) => {
        if(error) {
          return response.status(401).send({ "message" : "a `title` required" });
        } else if(!request.body.content) {
          return response.status(401).send({ "message" : "a `content` is required" });
        }

        var blog = {
          "type" : "blog",
          "pid" : request.pid.
          "title" : request.body.title,
          "content" : request.body.content,
          "timestamp" : (new Date()).getTime()
        };

        bucket.insert(UUID.v4(), blog, (error, result) => {
          if(error) {
            return response.status(500).send(error);
          }
          response.send(blog);

        });
      });



app.post("/blog", validate, (request, response) => {
  if(!request.body.title) {
    return response.status(401).send({ "message" : "a `title` is required" });

  } else if (!request.body.content) {
    return response.status(401).send({ "message" : "a `content` is required" });
  }

  var blog = {
    "type" : "blog",
    "pid" : request.pid,
    "title" : request.body.title,
    "content" : request.body.content,
    "timestamp" : (newDate()).getTime()
  };

  bucket.insert(UUID.v4(), blog, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(blog);

  });
});



app.get("/blogs", validate, (request, response) => {
  console.log(request.pid);

  var query = N1qlQuery.fromString("SELECT `" + bucket._name + "`.* FROM `" + bucket._name + "` WHERE type = 'blog' AND pid = $pid");
  bucket.query(query, { "pid" : request.pid }, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});
