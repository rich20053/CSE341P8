"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require('dotenv');
dotenv.config(); // dotenv.config( { path: './config/config.env' })
var express = require('express');
var mongodb = require('./models/connect');
var bodyParser = require('body-parser');
var passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;
var port = process.env.PORT || 8080;
var app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Define the directory where your HTML files (views) are located
app.set('views', __dirname + '/views');
app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use(express.urlencoded({ extended: true }))
    .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
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
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// Callback route after Google authentication
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});
mongodb.initDb(function (err, mongodb) {
    if (err) {
        console.log(err);
    }
    else {
        try {
            app.listen(port);
            console.log("Connected to DB from ".concat(process.env.NODE_ENV, " and listening on ").concat(port));
        }
        catch (er) {
            console.error(er);
            process.exit(1);
        }
    }
});
