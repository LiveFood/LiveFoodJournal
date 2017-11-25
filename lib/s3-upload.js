'use strict';

const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const {S3} = require('aws-sdk');

const s3 = new S3();

const upload = multer({dest: `${__dirname}/../temp-assets`});

module.exports = (fieldName) => (req, res, next) => {

  upload.single(fieldName)(req, res, (err) => {

    if(err) {return next(err);}
    if(!req.file) {return next(new Error('file required to upload'));}

    s3.upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fs.createReadStream(req.file.path),
    })
      .promise()
      .then(s3Data => {
        req.s3Data = s3Data;
        return fs.remove(`${__dirname}/../temp-assets/${req.file.filename}`);
      })
      .then(() => next())
      .catch(next);
  });
};
