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
  let tempUser;
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing missing content', () => {

    it('should respond with 400 due to missing username', () => {

      return superagent.post(`${API_URL}/auth/register`)
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
