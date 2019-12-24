const User = require('../models/user');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = function(req, res, next) {
  console.log('req.body:', req.body);
  console.log('req.params:', req.params);
  // try {
  const token_id = req.body.id_token;

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
        //   db.User.findOne({ googleId }, (err, docs) => {
        //     if (err) {
        //       console.error(err);
        //     }

        //     if (!docs) {
        //       db.User.create(newUser).then(dbModel => {
        //         res.send(dbModel._id);
        //       });
        //     } else {
        //       res.send(docs._id);
        //     }
        //   });
        User.findOne({ googleId }).then(function(dbUser) {
          req.user = dbUser;
          next();
        });
      }
    })
    .catch(console.error);
};

// } catch (err) {
// 	res.status(401).json({ message: "Unauthorized" });
// }
// };
