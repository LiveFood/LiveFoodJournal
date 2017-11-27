'use strict';

const expect = require('expect');
const superagent = require('superagent');
const cleanDB = require('./lib/clean-db.js');

require('dotenv').config();
const server = require('../lib/server');

describe('testing Journal API', () => {
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

  describe('testing GET /api/journal', () => {
    it('should return 200 status and a journal', () => {
      return superagent.get(`${process.env.API_URL}/api/journal`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body[0].authorid).toEqual(['Max5']);
          expect(res.body[0].mealConsumed).toEqual('burger');
          expect(res.body[0].mealFeedback).toEqual('tastes good!');
        });
    });
    //res.body would be [] in DEL after Delete or something else to check if array is empty
    // expect([res.body]).to.be.empty();
  });

});
