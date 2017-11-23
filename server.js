'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
});
app.use(require('./routes/journal-router'));
app.use(require('./routes/user-router'));


// const journals = require('./routes/journals');
//
// app.use(bodyParser.json());
// app.use('/api', journals);
