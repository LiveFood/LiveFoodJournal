'use strict';


const expect = require('expect');
const assert = require('chai').assert;
const superagent = require('superagent');
const profile = require('../model/profile');


describe('testing GET /api/profile', () => {
  it('should return 200 status and a journal', () => {
    return profileRouter.get('/api/journal/')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body[0].userid).toEqual('Brian');
      expect(res.body[0].name).toEqual('Brian');
      expect(res.body[0].objectId).toEqual('Journal');
      expect(res.body[0].objectId).toEqual('Recipe');
     });
    });
  });


  describe('testing Profile', () => {
    describe('testing POST /api/profile', () => {
      it('should give us 200 in status', () => {
        return profile.get('/api/journal/')
        // .set('Authorization', `Bearer ${user.token}`)
        .send({
          userId: 'Brian',
          name: 'Brian',
          journal: 'mm that was delicious!',
          recipe: 'chicken salad',
        })
        .then(res => {
          return expect(res.status).toEqual(200);
        });
      });
    });
  };
