"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require('dotenv');
dotenv.config(); // dotenv.config( { path: './config/config.env' })
var path = require('path');
var express = require('express');
var mongodb = require('./models/connect');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require("express-session");
//const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;
var port = process.env.PORT || 8080;
//Passport config
require("./util/passport")(passport);
var app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Define the directory where your HTML files (views) are located
app.set('views', __dirname + '/views');
// Sessions
app.use(session({
    secret: "Pumpking Pudding",
    resaver: false,
    saveUninitialized: false
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use(express.urlencoded({ extended: true }))
    .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
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
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
});
