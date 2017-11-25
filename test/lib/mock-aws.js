'use strict';

const awsMock = require('aws-sdk-mock');

awsMock('S3', 'upload', function(params, cb) {

  if(params.ACL !== 'public-read') {return cb(new Error('ACL must be public-read'));}

  if(params.Bucket !== 'fake-buket') {return cb(new Error('bucket must be fake-buc  '));}

  if(!params.Key) {return cb(new Error('key must be set'));}

  if(!params.Body) {return cb(new Error('body must be set'));}

  cb(null, {
    Key: params.Key,
    Location: `fakeaws.s3.com/fake-bucket/${params.Key}`,
  });
});

awsMock.mock('S3', 'deleteObject', function(params, cb) {

  if(!params.Key) {return cb(new Error('key must be set'));}

  if(!params.Bucket) {return cb(new Error('bucket must be fake-bucket'));}

  cb();
});
