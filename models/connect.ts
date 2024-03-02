const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db: any;

const initDb = (callback: any) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  //console.log(process.env.MONGODB_URI);
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client: any) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err: any) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};