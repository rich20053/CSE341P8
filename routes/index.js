const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const { auth, requiresAuth } = require('express-openid-connect');

dotenv.config();

/*
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
*/

router.use(auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL, // Update with your app's base URL
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-eoeqs0i46b7m7dfa.us.auth0.com' // Update with your Auth0 domain
}));

router.get('/', function (req, res, next) {
  res.redirect('/api-docs');
});


router.use('/api-docs', requiresAuth(), require('./swagger'));
router.use('/songs', requiresAuth(), require('./songs'));
router.use('/artists', requiresAuth(), require('./artists'));
router.use('/albums', requiresAuth(), require('./albums'));

// Login route
router.get('/login', passport.authenticate('auth0', { scope: 'openid email profile' }));

// Callback route
router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/api-docs'); // Redirect to your dashboard or any other route after successful authentication
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout({
    returnTo: AUTH0_BASE_URL+DASHBOARD,
    clientID: AUTH0_CLIENT_ID
  }, (err) => {
    if (err) {
      console.error('Logout error:', err);
    } else {
      console.log('Logout successful');
      // Redirect or perform any post-logout actions here
    }
  });
  res.redirect('/login');
});

module.exports = router;