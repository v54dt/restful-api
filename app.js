var express = require('express');
var app = express();
var db = require('./db');
var userconreoller = require('/user/sercontroller');
app.use('/users', userconreoller);
module.exportss = app;