'use strict';

const expect = require('expect');
const superagent = require('superagent');
const cleanDB = require('./lib/clean-db.js');
const Recipe = require('../model/recipe');

require('dotenv').config();
const server = require('../lib/server');

describe('testing Recipe API', () => {
  before(server.start);
  after(server.stop);
  after(cleanDB);

  describe('testing POST /api/recipe', () => {
    it('should give us 200 in status', () => {
      return superagent.post(`${process.env.API_URL}/api/recipe`)
      // .set('Authorization', `Bearer ${user.token}`)
        .send({
          authorid: 'Max',
          mealName: 'Chicken salad',
          ingredients: 'chicken, salad',
          cookingTime: '10 min',
          cookingLevel: 'Boss',
        })
        .then(res => {
          return expect(res.status).toEqual(200);
        });
    });
  });

  describe('testing GET /api/recipe', () => {
    it('should return 200 status and a recipe', () => {
      return superagent.get(`${process.env.API_URL}/api/recipe/`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body[0].authorid).toEqual('Max');
          expect(res.body[0].mealName).toEqual('Chicken salad');
          expect(res.body[0].ingredients).toEqual(['chicken, salad']);
          expect(res.body[0].cookingTime).toEqual('10 min');
          expect(res.body[0].cookingLevel).toEqual('Boss');
        });
    });
  });
  //res.body would be [] in DEL after Delete or something else to check if array is empty
  // expect([res.body]).to.be.empty();

});//end of tests
