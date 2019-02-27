const router = require('express').Router();

router.route('/').post(function(req, res) {
  const token_id = req.body.idtoken;
  console.log(req.body);
  console.log('Backend route recieved token_id: ', token_id);
  //   res.sendStatus(200);
  res.send('New User');
});

module.exports = router;
