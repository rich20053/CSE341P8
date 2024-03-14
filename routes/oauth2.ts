const oar_express = require('express');
const oar_router = oar_express.Router();
const OAuth2Strategy = require('passport-oauth2').Strategy;
const oar_passport = require('passport');
const oar_ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const oar_app = oar_express();

var oar_dotenv = require('dotenv');
oar_dotenv.config();

oar_passport.use('Google', new OAuth2Strategy({
    authorizationURL: 'https://goggle.com/oauth2/authorize',
    tokenURL: 'https://goggle.com/oauth2/token',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_ID,
    callbackURL: 'http://localhost:3000/auth/callback' // Your callback URL
  },
  function(accessToken: any, refreshToken: any, profile: any, cb: any) {
    // Optionally, you can retrieve user profile information here
    return cb(null, profile);
  }
));

// Route to initiate authentication with Google
oar_app.get('/auth/google',
oar_passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google authentication
oar_app.get('/auth/google/callback',
oar_passport.authenticate('google', { failureRedirect: '/login' }),
(req: any, res: any) => {
  // Successful authentication, redirect home.
  res.redirect('/');
}
);

oar_app.get('/protected',
require('connect-ensure-login').ensureLoggedIn(),
function(req: any, res: any) {
  res.send('Protected Resource');
});
