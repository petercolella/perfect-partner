const router = require("express").Router();
const nudgesController = require("../../controllers/nudgesController");

// Matches with "/api/nudges"
router.route("/")
  .get(nudgesController.findAll)
  .post(nudgesController.create);

// Matches with "/api/nudges/:id"
router
  .route("/:id")
  .get(nudgesController.findById)
  .put(nudgesController.update)
  .delete(nudgesController.remove);


module.exports = router;
