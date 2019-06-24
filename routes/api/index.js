const router = require('express').Router();
const userRoutes = require('./users');
const nudgeRoutes = require('./nudges');
const textRoutes = require('./text');
const tokenRoutes = require('./token');

router.use('/users', userRoutes);
router.use('/nudges', nudgeRoutes);
router.use('/text', textRoutes);
router.use('/token', tokenRoutes);

module.exports = router;
