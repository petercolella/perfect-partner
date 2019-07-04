const router = require('express').Router();
const textController = require('../../controllers/textController');

router.route('/send').post(textController.send);
router.route('/activate').post(textController.activate);
router.route('/toggle/:id').post(textController.toggle);

module.exports = router;
