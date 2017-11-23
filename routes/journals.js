'use strict';

const express = require('express');
const router = express.Router();
//have body parser!!!
router.get('/journals', (req, res) => {
  console.log('this is GET route for journals');
  res.send('this is a string! from GET in journals ');
});

router.post('/journals', (req, res) => {
  console.log('this is POST route for journals');
  console.log(req.body.feedback);
  res.send('this is a string from POST in journals ');
});

module.exports = router;
