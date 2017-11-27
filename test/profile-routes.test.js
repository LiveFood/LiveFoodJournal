'use strict';


var request - require('supertest');
var express = require('express');


const app = express();


app.get('/user', function(req, res) {
  res.status(200).json({name: 'userName' });

});

describe('GET /users', function() {
  it('responds w json', function(done) {
    request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if(err) return done(err);
      done();
    });
  });
});
