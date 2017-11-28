'use strict';

const expect = require('expect');
const superagent = require('superagent');
const cleanDB = require('./lib/clean-db.js');
const Journal = require('../model/journal');

require('dotenv').config();
const server = require('../lib/server');

describe('testing Journal API', () => {
  before(server.start);
  after(server.stop);
  after(cleanDB);
  let saveId;

  describe('testing POST /api/journal', () => {
    it('should give us 200 in status', () => {
      return superagent.post(`${process.env.API_URL}/api/journal`)
      // .set('Authorization', `Bearer ${user.token}`)
      // uncomment the line above ^ when Devin's user stuff is running and use it in other places as needed
        .send({
          authorid: 'Max',
          mealConsumed: 'burger',
          mealFeedback: 'tastes good!',
        })
        .then(res => {
          saveId = res.body._id;
          return expect(res.status).toEqual(200);
        });
    });
  });

  describe('testing GET /api/journal', () => {
    it('should return 200 status and a journal', () => {
      return superagent.get(`${process.env.API_URL}/api/journal/`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body[0].authorid).toEqual('Max');
          expect(res.body[0].mealConsumed).toEqual('burger');
          expect(res.body[0].mealFeedback).toEqual('tastes good!');
        });
    });
  });

  describe('testing PATCH /api/journal/:id', () => {
    it('should PATCH a journal entry', () => {
      return superagent.patch(`${process.env.API_URL}/api/journal/` + saveId)
        .send({
          authorid: 'Patched Max',
          mealConsumed: 'Patched burger',
          mealFeedback: 'Patched tastes good!',
        })
        .then(res => {
          // console.log('RES.BODYYYY', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.authorid).toEqual('Patched Max');
          expect(res.body.mealConsumed).toEqual('Patched burger');
          expect(res.body.mealFeedback).toEqual('Patched tastes good!');
        });
    });
  });

  //the following GET test is not a duplicate. It checks After PATCH ^ test to
  //see what is actually in the data base, if things patched for sure, and
  //that the result of PATCH test aren't just echoing themselves back.
  //the GET test below checks the PATCH test above. phew!... good
  describe('testing GET after Patch /api/journal', () => {
    it('should return 200 status and a journal', () => {
      return superagent.get(`${process.env.API_URL}/api/journal/`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body[0].authorid).toEqual('Patched Max');
          expect(res.body[0].mealConsumed).toEqual('Patched burger');
          expect(res.body[0].mealFeedback).toEqual('Patched tastes good!');
        });
    });
  });

  describe('testing PUT /api/journal/:id', () => {
    it('should PUT a journal entry', () => {
      return superagent.put(`${process.env.API_URL}/api/journal/` + saveId)
        .send({
          authorid: 'Put Max',
          mealConsumed: 'Put burger',
          mealFeedback: 'Put tastes good!',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.authorid).toEqual('Put Max');
          expect(res.body.mealConsumed).toEqual('Put burger');
          expect(res.body.mealFeedback).toEqual('Put tastes good!');
        });
    });
  });

  //DELETE errrything
  describe('testing DELETE /api/journal', () => {
    it('should return 200 status and a journal', () => {
      return superagent.delete(`${process.env.API_URL}/api/journal/` + saveId)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({});
          //receives empty Object ^^^
        });
    });
  });

  //the GET test below checks DELETE test above to make sure there's
  //nothing to GET after DELETE ran successfully
  describe('testing GET after Patch /api/journal', () => {
    it('should return 200 status and a journal', () => {
      return superagent.get(`${process.env.API_URL}/api/journal/`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual([]);
          //line above expect an empty ^ array of objects after things were DELeted
        });
    });
  });

}); //end of tests
//res.body would be [] in DEL after Delete or something else to check if array is empty
// expect([res.body]).to.be.empty();
