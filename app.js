const dotenv = require('dotenv');
const express = require('express');
const mongodb = require('./models/connect');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const session = require('express-session');
const { auth, requiresAuth } = require('express-openid-connect');
const passport = require('passport');
require('./config/passport'); // Import the passport configuration

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-eoeqs0i46b7m7dfa.us.auth0.com'
};

app.use(auth(config));

app.use(passport.initialize());
app.use(passport.session());

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

const port = process.env.PORT || 8080;
  
// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app
  //.use(logger('dev'))
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use('/', requiresAuth(), require('./routes'))
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })


// Default Dashboard
app.use(function (req, res, next) {
  res.redirect('/api-docs');
});


// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});
  
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    http.createServer(app)
    .listen(port, () => {
      console.log(`Listening on ${process.env.NODE_ENV}`);
    });
  }
});
