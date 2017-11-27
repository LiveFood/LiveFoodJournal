'use strict';

const expect = require('expect');
const superagent = require('superagent');

require('dotenv').config();
const server = require('../lib/server');

describe('testing POSt to Journal', () => {
  before(server.start);
  after(server.stop);

  describe('testing POST /api/journal', () => {
    it('should give us 200 in status', () => {
      return superagent.post(`${process.env.API_URL}/api/journal`)
      // .set('Authorization', `Bearer ${user.token}`)
        .send({
          authorid: 'Max0',
          mealConsumed: 'burger',
          mealFeedback: 'tastes good!',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
