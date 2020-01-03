const User = require('../models/user');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const fn = require('../scripts/fn');

module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Unauthorized');

    fn.verify(authorization)
      .then(ticket => {
        const payload = ticket.getPayload();
        const googleId = payload['sub'];

        if (CLIENT_ID === payload['aud']) {
          User.findOne({ googleId }).then(function(dbUser) {
            req.user = dbUser;
            next();
          });
        }
      })
      .catch(err => {
        console.log('verify err:', err);
        res.status(401).json(err.message);
      });
  } catch (err) {
    console.log('authorization err:', err);
    res.status(401).json(err.message);
  }
};
