const User = require('../models/user');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const fn = require('../scripts/fn');

module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();

    fn.verify(authorization)
      .then(payload => {
        const googleId = payload['sub'];

        if (CLIENT_ID === payload['aud']) {
          User.findOne({ googleId }).then(function(dbUser) {
            req.user = dbUser;
            next();
          });
        }
      })
      .catch(console.error);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
