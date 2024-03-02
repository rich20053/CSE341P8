var express = require('express');
var mongodb = require('./models/connect');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();
app
    .use(bodyParser.json())
    .use('/', require('./routes'))
    .use(express.urlencoded({ extended: true }))
    .use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
mongodb.initDb(function (err, mongodb) {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port);
        console.log("Connected to DB and listening on ".concat(port));
    }
});
