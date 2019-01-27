const router = require('express').Router();
const userRoutes = require('./users');
const nudgeRoutes = require('./nudges');

router.use('/users', userRoutes);
router.use('/nudges', nudgeRoutes);

module.exports = router;