var express = require('express');
//var mongoose = require('mongoose');
//var bodyParser = require('body-parser');
var config = require('./config');
//var mongodb = require('./mongodb');
var UserController = require('./UserController');

var app = express();


app.use('/', UserController);
/*app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
*/
app.listen(config.PORT, function () {
    console.log('listening on port 3000!');
})
