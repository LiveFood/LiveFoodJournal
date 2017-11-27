'use strict';

const expect = require('expect');
const superagent = require('superagent');
const cleanDB = require('./lib/clean-db.js');

require('dotenv').config();
const server = require('../lib/server');

describe('testing POSt to Journal', () => {
  before(server.start);
  after(server.stop);
  after(cleanDB);

  describe('testing POST /api/journal', () => {
    it('should give us 200 in status', () => {
      return superagent.post(`${process.env.API_URL}/api/journal`)
      // .set('Authorization', `Bearer ${user.token}`)
        .send({
          authorid: 'Max5', //change number with each test PLEASE!
          mealConsumed: 'burger',
          mealFeedback: 'tastes good!',
        })
        .then(res => {
          return expect(res.status).toEqual(200);
        });
    });
  });
});
