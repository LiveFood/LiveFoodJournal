'use strict';


const should = require("should");
const request = require("superagent");
const User = require('../lib/model/user.js');
const expect = require('expect');


process.env.DB_URL = 'mongodb://localhost:3000';
const PORT = 3000;
const HOST = 'http://localhost';


beforeAll(() => {
  require('../lib/server.js').start(PORT);
  return User.remove({});
});



describe('GET / signin', () => {

  test('Sign in success should return 200 and token', () => {

    return request
      .get(`${HOST}:${PORT}/${API}/signin`)
      .auth('name', 'password')
      .then(res => {
        expect(res.text).not.toBe(undefined);
        expect(res.status).toEqual(200);
      });
    });
  });


  test('Sign in error should return 401 and token', () => {

    return request
      .get(`${HOST}:${PORT}/${API}/signin`)
      .auth('name', 'journal')
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('erorr unauthorized');
        expect(res.status).toEqual(401);
      });
    });
  });


  describe('Unregistered Routes', () => {

    test('Bad URI should return 404', () => {

      return request
      .get(`${HOST}:${PORT}/signin`)
      .auth('name', 'password')
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('Missing');
        expect(res.status).toEqual(404);
      });
    });
  });
