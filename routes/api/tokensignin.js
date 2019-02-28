const router = require('express').Router();
const { OAuth2Client } = require('google-auth-library');
const config = require('../../config/config.json');
const CLIENT_ID = config.development.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

let user_id;

router.route('/').post(function(req, res) {
  const token_id = req.body.idtoken;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token_id,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    user_id = userid;

    console.log(userid);
    console.log(payload);
    console.log(CLIENT_ID === payload['aud']);
    res.send(payload['name']);
    console.log('user_id: ', user_id);
  }

  verify().catch(console.error);
});

module.exports = router;
