require('dotenv').config();
const db = require('../models');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
  create: function(req, res) {
    const token_id = req.body.idtoken;

    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token_id,
        audience: CLIENT_ID
      });

      const payload = ticket.getPayload();
      return payload;
    }

    verify()
      .then(payload => {
        console.log('payload', payload);
        const googleId = payload['sub'];
        const name = payload['name'];
        const email = payload['email'];
        const imageUrl = payload['picture'];
        const firstName = payload['given_name'];
        const lastName = payload['family_name'];

        const newUser = {
          googleId,
          name,
          email,
          imageUrl,
          firstName,
          lastName
        };

        if (CLIENT_ID === payload['aud']) {
          db.User.findOne({ googleId }, (err, docs) => {
            if (err) {
              console.error(err);
            }

            if (!docs) {
              db.User.create(newUser).then(dbModel => {
                res.send(dbModel._id);
              });
            } else {
              res.send(docs._id);
            }
          });
        }
      })
      .catch(console.error);
  }
};
