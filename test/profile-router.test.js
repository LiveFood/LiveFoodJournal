'use strict';


const expect = require('expect');
const assert = require('chai');
const profile = require('../model/profile');


describe('testing GET /api/profile', () => {
  it('should return 200 status and a user profile', () => {
    return profile.get('../api/profile/')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body[0].userid).toEqual('userid');
      expect(res.body[0].name).toEqual('name');
     });
    });
  });


describe('testing POST /api/profile', () => {
      it('should give us 200 in status', () => {
        return profile.post('../api/user/')
        .then(res => {
          return expect(res.status).toEqual(200);
        });
      });
    });
};
