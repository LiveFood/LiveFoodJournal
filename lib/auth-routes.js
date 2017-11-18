'use strict';


const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();


cont authRouter = module.exports = require('express').Router();


authRouter.post('/signup', jsonParser, (req, res, next) => {
  const password = req.body.password;
  delete req.body.password;
  (new User(req.body)).generateHash(password)
    .then((user) => {
      user.save()
        .then(res.send.bind(res)) //have to use bind.res to avoid anonymous function
        .catch(next);
    })
    .catch(next); //passing in next function
});







//dont save pw in db (text)
