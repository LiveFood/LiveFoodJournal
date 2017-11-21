'use strict';
//
const express = require('express');
const promAll = require('bluebird').promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const connection  = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const jsonParser = require('body-parser').json();

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
});

app.post('/api/notes', jsonParser, (req, res) => {
  console.log('HERE IN POST');
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync(req.body)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    return db;
  });
});

app.get('/api/notes', (req, res) => {
//if req.query.id exists, our findQuery will be equal to an obj with _id=req.query.id
//if it doesnt exist, findQuery will be = emptry obj and we'll find all our note
  let findQuery = req.query.id ? {_id: req.query.id} : {};
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.findAsync(findQuery).then(cur => {
      promAll(cur).toArrayAsync()
        .then(res.send.bind(res))
        .catch(console.log)
        .catch(() => res.status(500).send('server error'));
    });
    return db;
  });
});


// const journals = require('./routes/journals');
//
// app.use(bodyParser.json());
// app.use('/api', journals);
