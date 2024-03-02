import { MongoClient, MongoDBCollectionNamespace, MongoDBNamespace } from "mongodb";

var dotenv = require('dotenv');
dotenv.config(); // dotenv.config( { path: './config/config.env' })
const path = require('path');
const express = require('express');
const mongodb = require('./models/connect');
const bodyParser = require('body-parser');
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;

const port = process.env.PORT || 8080;
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Define the directory where your HTML files (views) are located
app.set('views', __dirname + '/views');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app
  .use(bodyParser.json())
  .use('/', require('./routes'))
  .use(express.urlencoded({ extended: true }))
  .use((req: any, res: { setHeader: (arg0: any, arg1: any) => void; }, next: () => void) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

/*/ Configure Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  (accessToken: any, refreshToken: any, profile: any, done: any) => {
    // Handle user authentication
    // This function is called after successful authentication
    // You can save user information to your database here
    return done(null, profile);
  }
));*/

// Route to initiate authentication with Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google authentication
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: any, res: any) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

mongodb.initDb((err: string, mongodb: MongoClient) => {
  if (err) {
    console.log(err);
  } else {
    try {
    app.listen(port);
    console.log(`Connected to DB from ${process.env.NODE_ENV} and listening on ${port}`);
    }
    catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
});

