'use strict';


const expect = require('expect');
const superagent = require('superagent');
const profile = require('../model/profile');


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


  describe('testing Profile', () => {
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
