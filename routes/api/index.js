const router = require('express').Router();
const userRoutes = require('./users');
const textRoutes = require('./text');

router.use('/users', userRoutes);
router.use('/send', textRoutes);

module.exports = router;
