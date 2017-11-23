'use strict';
//my server testing. use server within EXPRESS-MONGO folder
const express = require('express');
const app = express();
const jsonParser = require('body-parser');
const port = process.env.PORT || 3000;
const journals = require('./routes/journals');

app.use(jsonParser.json());
app.use('/api', journals);


app.listen(port, () => {
  console.log('Listening on port' + port);
});
