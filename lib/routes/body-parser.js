'use strict';



var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//create app / json parser
var jsonParser = bodyParser.json();


//create app / form urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended : false });



//POST / login gets urlencoded bodies
app.post('/login', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  res.send('welcome, ' + req.body.username);
});



app.post('/api/users', jsonParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  //create user in req.body
});
