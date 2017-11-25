'use strict';

module.exports = (err, req, res, next) => {

  console.error(err.message.toLowerCase());

  if(err.message.includes('validation failed'))
    return res.sendStatus(400);

  if(err.message.includes('unauthorized'))
    return res.sendStatus(400);

  if(err.message.includes('jwt malformed'))
    return res.sendStatus(400);

  if(err.message.includes('invalid token'))
    return res.sendStatus(401);

  if(err.message.includes('objectid failed'))
    return res.sendStatus(404);

  if(err.message.includes('duplicate key'))
    return res.sendStatus(409);

  res.sendStatus(500);
};
