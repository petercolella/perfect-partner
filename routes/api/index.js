const router = require('express').Router();
const userRoutes = require('./users');
const nudgeRoutes = require('./nudges');
const textRoutes = require('./text');
const tokenRoutes = require('./tokensignin');

router.use('/users', userRoutes);
router.use('/nudges', nudgeRoutes);
router.use('/text', textRoutes);
router.use('/tokensignin', tokenRoutes);

module.exports = router;
