'use strict';
//my server
const express = require('express');
const app = express();
const journals = require('./routes/journals');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', journals);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port' + port);
});
