const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const mongodb = require('./models/connect');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const passport = require('passport');
const { auth } = require('express-openid-connect');
require('./config/passport'); // Import the passport configuration

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log("Session1");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
console.log("Passport");

app.use(passport.initialize());
app.use(passport.session());
console.log("Use");

app
  .use(logger('dev'))
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use('/', require('./routes'))
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
/*
console.log("config");
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: 'https://dev-eoeqs0i46b7m7dfa.us.auth0.com'
  };
console.log("Auth");
  
  app.use(auth(config));
*/
console.log("Port");
  const port = process.env.PORT || 8080;
  console.log("User");
  
  // Middleware to make the `user` object available for all views
  app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
  });
  console.log("Router");

  app.use('/', router);
  console.log("Catch 404");

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
console.log("Error Handlers");
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});
  
console.log("initDb");

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
