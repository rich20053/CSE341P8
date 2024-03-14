const dotenv = require('dotenv');
const express = require('express');
const mongodb = require('./models/connect');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const { auth } = require('express-openid-connect');

//dotenv.load();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

  const config = {
    authRequired: false,
    auth0Logout: true
  };

  const port = process.env.PORT || 8080;
  if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
    config.baseURL = `http://localhost:${port}`;
  }
  
  app.use(auth(config));

  // Middleware to make the `user` object available for all views
  app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
  });

  app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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
      console.log(`Listening on ${config.baseURL}`);
    });
  }
});


