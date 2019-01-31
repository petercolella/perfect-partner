const router = require('express').Router();
const userRoutes = require('./users');
const nudgeRoutes = require('./nudges');
const textRoutes = require('./text');

router.use('/users', userRoutes);
router.use('/nudges', nudgeRoutes);
router.use('/send', textRoutes);

module.exports = router;
