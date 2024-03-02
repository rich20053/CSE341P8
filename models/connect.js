var dotenv = require('dotenv');
dotenv.config();
var MongoClient = require('mongodb').MongoClient;
var _db;
var initDb = function (callback) {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    //console.log(process.env.MONGODB_URI);
    MongoClient.connect(process.env.MONGODB_URI)
        .then(function (client) {
        _db = client;
        callback(null, _db);
    })
        .catch(function (err) {
        callback(err);
    });
};
var getDb = function () {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};
module.exports = {
    initDb: initDb,
    getDb: getDb,
};
