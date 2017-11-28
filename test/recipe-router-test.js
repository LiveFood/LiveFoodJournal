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
  let saveId;

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
          saveId = res.body._id;
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

  describe('testing PATCH /api/recipe/:id', () => {
    it('should PATCH a recipe entry', () => {
      return superagent.patch(`${process.env.API_URL}/api/recipe/` + saveId)
        .send({
          authorid: 'Maaax',
          mealName: 'Cheese pizza',
          ingredients: ['Some cheese and some ', 'pizza', 'pineapple'],
          cookingTime: '50 min',
          cookingLevel: 'Pro',
        })
        .then(res => {
          // console.log('RES.BODYYYY', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.authorid).toEqual('Maaax');
          expect(res.body.mealName).toEqual('Cheese pizza');
          expect(res.body.ingredients).toEqual(['Some cheese and some ', 'pizza', 'pineapple']);
          expect(res.body.cookingTime).toEqual('50 min');
          expect(res.body.cookingLevel).toEqual('Pro');
        });
    });
  });

  //fix patch test and uncomment
  //testing previous PATCH test with the follwing GET test
  // describe('testing GET after Patch /api/recipe', () => {
  //   it('should return 200 status and a recipe', () => {
  //     return superagent.get(`${process.env.API_URL}/api/recipe/`)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body[0].authorid).toEqual('Maaax');
  //         expect(res.body[0].mealName).toEqual('Cheese pizza');
  //         expect(res.body[0].ingredients).toEqual(['Some cheese and some ', 'pizza', 'pineapple']);
  //         expect(res.body[0].cookingTime).toEqual('50 min');
  //         expect(res.body[0].cookingLevel).toEqual('Pro');
  //       });
  //   });
  // });

  describe('testing PUT /api/recipe/:id', () => {
    it('should PUT a recipe entry', () => {
      return superagent.put(`${process.env.API_URL}/api/recipe/` + saveId)
        .send({
          authorid: 'PUT Maaax',
          mealName: 'PUT Cheese pizza',
          ingredients: ['PUT Some cheese and some ', 'pizza', 'pineapple'],
          cookingTime: 'PUT 50 min',
          cookingLevel: 'PUT Pro',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.authorid).toEqual('PUT Maaax');
          expect(res.body.mealName).toEqual('PUT Cheese pizza');
          expect(res.body.ingredients).toEqual(['PUT Some cheese and some ', 'pizza', 'pineapple']);
          expect(res.body.cookingTime).toEqual('PUT 50 min');
          expect(res.body.cookingLevel).toEqual('PUT Pro');
        });
    });
  });

  //DELETE errrything by that id
  describe('testing DELETE /api/recipe/:id', () => {
    it('should return 200 status and a recipe', () => {
      return superagent.delete(`${process.env.API_URL}/api/recipe/` + saveId)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({});
          //receives empty Object ^^^
        });
    });
  });

  //the GET test below checks DELETE test above to make sure there's
  //nothing to GET after DELETE ran successfully
  // describe('testing GET after DELETE /api/recipe', () => {
  //   it('should return 200 status and a recipe', () => {
  //     return superagent.get(`${process.env.API_URL}/api/recipe/`)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         expect(res.body).toEqual([]);
  //         //line above expect an empty ^ array of objects after things were DELeted
  //       });
  //   });
  // });


});//end of tests
