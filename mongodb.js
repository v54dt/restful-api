var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.db_path);
mongoose.Promise = global.Promise;

var mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    mongodb
};