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

  describe('testing POST /api/journal', () => {
    it('should give us 200 in status', () => {
      return superagent.post(`${process.env.API_URL}/api/journal`)
      // .set('Authorization', `Bearer ${user.token}`)
        .send({
          authorid: 'Max',
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
      return superagent.get(`${process.env.API_URL}/api/journal/`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body[0].authorid).toEqual('Max');
          expect(res.body[0].mealConsumed).toEqual('burger');
          expect(res.body[0].mealFeedback).toEqual('tastes good!');
        });
    });
  });
  //res.body would be [] in DEL after Delete or something else to check if array is empty
  // expect([res.body]).to.be.empty();

  // describe('testing PATCH /api/journal/:id', () => {
  //
  //   it('should PATCH a journal entry', () => {
  //
  //     return superagent.patch(`${process.env.API_URL}/api/journal/`)
  //     // .set('Authorization', `Bearer ${user.token}`)
  //       .send({
  //         // delete req.body._id;
  //         // Journal.findOneAndUpdate({_id: req.params.id}, {$set: req.body});
  //         _id: 'req.params.id',
  //         authorid: 'PatchedMax',
  //         mealConsumed: 'Patched burger',
  //         mealFeedback: 'Patched tastes good!',
  //       })
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body[0].authorid).toEqual('PatchedMax');
  //         expect(res.body[0].mealConsumed).toEqual('Patched burger');
  //         expect(res.body[0].mealFeedback).toEqual('Patched tastes good!');
  //       });
  //   });
  // });

  // describe('testing PUT /api/journal/:id', () => {
  //
  //   it('should PUT a journal entry', () => {
  //
  //     return superagent.put(`${process.env.API_URL}/api/journal/`)
  //     // .set('Authorization', `Bearer ${user.token}`)
  //       .send({
  //         authorid: 'Put Max',
  //         mealConsumed: 'Put burger',
  //         mealFeedback: 'Put tastes good!',
  //       })
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body[0].authorid).toEqual('Put Max');
  //         expect(res.body[0].mealConsumed).toEqual('Put burger');
  //         expect(res.body[0].mealFeedback).toEqual('Put tastes good!');
  //       });
  //   });
  // });
  

});//end of tests
