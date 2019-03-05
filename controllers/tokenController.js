const db = require('../models');
const { OAuth2Client } = require('google-auth-library');
const config = require('../config/config.json');
const CLIENT_ID = config.development.CLIENT_ID;
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

      const googleId = payload['sub'];
      const name = payload['name'];
      const email = payload['email'];
      const imageUrl = payload['picture'];

      const newUser = {
        googleId,
        name,
        email,
        imageUrl
      };

      console.log(payload);

      if (CLIENT_ID === payload['aud']) {
        db.User.find({ googleId }, (err, docs) => {
          if (err) {
            console.error(err);
          }

          console.log('docs: ', docs);

          if (docs.length === 0) {
            db.User.create(newUser).then(dbModel =>
              console.log('dbModel: ', dbModel)
            );
          }
          res.send(docs || dbModel);
        });
      }
    }

    verify().catch(console.error);
  }
};
