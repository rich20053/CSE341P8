const ri_express = require('express');
const router = ri_express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
//router.use('/artistsongs', require('./artistsongs'));

// Login / Landing Page
router.get('/', function (req:any, res:any) {
    res.send('login');
});
// main
router.get('/main', function (req:any, res:any) {
    res.render('main');
});

module.exports = router;