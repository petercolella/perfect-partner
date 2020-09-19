require('dotenv').config();
const db = require('../models');
const CLIENT_ID = process.env.CLIENT_ID;
const fn = require('../scripts/fn');

module.exports = {
  create: (req, res) => {
    const { id_token, timeZone, offset } = req.body;

    fn.verify(id_token)
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
          lastName,
          timeZone,
          offset
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
        res.status(401).json(err.message.split(', ')[0]);
      });
  }
};
