const User = require('../models/user');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: authorization,
        audience: CLIENT_ID
      });

      const payload = ticket.getPayload();
      return payload;
    }

    verify()
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
