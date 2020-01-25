const router = require('express').Router();
const usersController = require('../../controllers/usersController');
const authware = require('../../middleware/authware');

// Matches with "/api/users"
router.route('/').post(usersController.create);

// Matches with "/api/users/:id"
router
  .route('/:id')
  .get(authware, usersController.findById)
  .put(authware, usersController.update)
  .delete(authware, usersController.remove);

module.exports = router;
