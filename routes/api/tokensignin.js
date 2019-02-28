const router = require('express').Router();
const { OAuth2Client } = require('google-auth-library');
const config = require('../../config/config.json');
const CLIENT_ID = config.development.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

router.route('/').post(function(req, res) {
  const token_id = req.body.idtoken;
  //   console.log(req.body);
  //   console.log('Backend route recieved token_id: ', token_id);
  //   res.sendStatus(200);
  console.log(CLIENT_ID);
  res.send('New User');
});

module.exports = router;
