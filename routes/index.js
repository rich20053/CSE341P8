const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();

dotenv.config();

router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
router.use('/api-docs', require('./swagger'));
router.use('/', require('./swagger'));


module.exports = router;