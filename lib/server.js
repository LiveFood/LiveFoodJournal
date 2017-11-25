'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
const server = module.exports = {};

app.use(morgan('dev'));
app.use(cors());

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log('Listening on port' + PORT);
// });

app.use(require('../routes/journal-router.js'));
app.use(require('../routes/recipe-router.js'));
app.use(require('../routes/profile-routes.js'));
app.use(require('../routes/user-router.js'));
app.use(require('./error-handler.js'));

app.all('/api/*', (req, res, next) => res.sendStatus(404));

server.isOn = false;
server.start = () => {

  return new Promise((resolve, reject) => {

    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        resolve();
      });
      return;
    }

    reject(new Error('server up already'));
  });
};

server.stop = () => {

  return new Promise((resolve, reject) => {

    if(server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        resolve();
      });
    }

    reject(new Error('server is down'));
  });
};
