'use strict';


var http = require('http');
var assert = require('assert');
var server = require('./server.js');


describe('HTTP Server Test', function() {
  //function passed to before() is called before running test
  before(function() {
    server.listen();

  });

  //function passed to after() is called after running test
  after(function() {
    server.close();

  });


describe('/', function() {
  it('should be Hello, Mocha!', function(done) {
    http.get('http://', function() {
      //assert the status code
      assert.equal(response.statusCode, 200);

      var body = '';
      response.on('data', function(d) {
        body += d;

      });

      response.on('end', function() {
        //wait until we read the response, then assert body
        //is 'Hello, Mocha!'
        assert.equal(body, 'Hello, Mocha!');
        done();
      });
    });
  });
});
})
};
