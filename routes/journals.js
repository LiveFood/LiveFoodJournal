'use strict';

const express = require('express');

const router = express.Router();

router.get('/journals', (req, res, next) => {
  console.log('this is GET route for journals');
  res.send('this is a string! from GET ');
});

router.post('/journals', (req, res, next) => {
  console.log('this is POST route for journals');
  console.log(req.body.feedback);
  res.send('this is a string from POST ');
});

module.exports = router;
