'use strict';


var http = require('http');
var assert = require('assert');
var server = require('./server.js');


describe('HTTP Server Test', function() {
  //function passed to before() is called before running test cases
  before(function() {
    server.listen(3000);
  });

  //function passed to after() is called after test case
  after(function() {
    server.close();
  });


describe('/', function() {
  it('hello world', function(done) {
    http.get(enter http url, function(response) new Promise(function(resolve, reject) {
      //assert status urlencode
      assert.equal(response.statusCode, 200);

      var body = '';
      response.on('data', function(d) {
        body += d;
      });

      response.on('end', function() {
        //wait til read response, then assert body
        assert.equal(body, 'hell world');
        done();
        });
      });
    });
  });
});
