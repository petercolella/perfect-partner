const router = require('express').Router();
const textController = require('../../controllers/textController');

router.route('/send').post(textController.send);

module.exports = router;
