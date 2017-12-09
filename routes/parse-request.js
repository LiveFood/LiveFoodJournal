'use strict';



const url = require('url');
const queryString = require('querystring');


module.exports = (req) => {
  return new Promise ((resolve, reject) => {

    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    let Methods = ['PUT', 'POST', 'PATCH'];


    if(! (req.method === 'PUT', 'POST', 'PATCH')) {
      return resolve(req);
    }

    let body = ' ';

    req.on('data', (data) => {
      body += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(body);
        resolve(req);

      } catch (err) {
        console.log(err);
        reject(err);
      }}
    })

    req.on('error', (err) => {
      console.log(err);
      reject(err);
    });
