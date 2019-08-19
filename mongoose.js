var mongoose = require('mongoose');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Test0727', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongoose connected to mongodb");
})