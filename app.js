//this is just me testing things..

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const journals = require('./routes/journals');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/try-notes');

const jsonParser = require('body-parser');
app.use(jsonParser.json());

app.get('/', (req, res) => {
  res.send('Message from GET from App.js');
});

app.listen(port, () => {
  console.log('listening for port ' + port);
});

app.use('/api', journals);
