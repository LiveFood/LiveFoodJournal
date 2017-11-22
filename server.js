'use strict';
//my server
const express = require('express');
const app = express();
const jsonParser = require('body-parser').json();

const journals = require('./routes/journals');

app.use(jsonParser.json());
app.use('/api', journals);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port' + port);
});
