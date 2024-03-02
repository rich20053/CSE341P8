var ri_express = require('express');
var router = ri_express.Router();
router.use('/api-docs', require('./swagger'));
router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
//router.use('/artistsongs', require('./artistsongs'));
// Login / Landing Page
router.get('/', function (req, res) {
    res.render('login');
});
// main
router.get('/main', function (req, res) {
    res.render('main');
});
module.exports = router;
