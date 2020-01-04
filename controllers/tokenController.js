require('dotenv').config();
const db = require('../models');
const CLIENT_ID = process.env.CLIENT_ID;
const fn = require('../scripts/fn');

module.exports = {
  create: function(req, res) {
    const token_id = req.body.idtoken;

    fn.verify(token_id)
      .then(ticket => {
        const payload = ticket.getPayload();

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
              res.status(422).json(err.message);
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
      .catch(err => {
        console.log('tokenController err:', err);
        res.status(401).json(err.message);
      });
  }
};
