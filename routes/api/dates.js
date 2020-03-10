const router = require('express').Router();
const customDatesController = require('../../controllers/customDatesController');

// Matches with "/api/nudges"
router.route('/').post(customDatesController.create);

// Matches with "/api/nudges/:id"
router
  .route('/:id')
  .get(customDatesController.findById)
  .put(customDatesController.update)
  .delete(customDatesController.remove);

module.exports = router;
