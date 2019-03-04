const router = require('express').Router();
const tokenController = require('../../controllers/tokenController');

router.route('/').post(tokenController.create);

module.exports = router;
