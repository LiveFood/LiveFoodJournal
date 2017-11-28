'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
require('./lib/mock-aws');

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');
const faker = require('faker');
const API_URL = process.env.API_URL;

describe('User Auth Testing', () => {
  before(server.start);
  after(server.stop);
  after(cleanDB);

  describe('testing missing content', () => {

    it('should respond with 400 due to missing username', () => {

      return superagent.post(`${API_URL}/api/auth/register`)
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });

  describe('testing user registration', () => {

    it('should respond with a 200', () => {

      return superagent.post(`${API_URL}/api/auth/register`)
        .send({
          userName: 'helpme',
          password: 'password',
          email: 'yolo1@23.com',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    it('should respond with 409', () => {  return superagent.post(`${API_URL}/api/auth/register`)
      .send({
        userName: 'helpme',
        password: 'password',
        email: 'yolo1@23.com',
      })
      .then(res => {
        expect(res.status).toEqual(409);
      });
    });

  });

});
