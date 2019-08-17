/*var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.db_path);
mongoose.Promise = global.Promise;

var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    mongodb
};*/

var config = require('./config');
var MongoClient = require('mongodb').MongoClient;
var url = db_path;