const router = require('express').Router();
const userRoutes = require('./users');
const nudgeRoutes = require('./nudges');
const textRoutes = require('./text');
const tokenRoutes = require('./token');
const dateRoutes = require('./dates');

router.use('/users', userRoutes);
router.use('/nudges', nudgeRoutes);
router.use('/text', textRoutes);
router.use('/token', tokenRoutes);
router.use('/dates', dateRoutes);

module.exports = router;
