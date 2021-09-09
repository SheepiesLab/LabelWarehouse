var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var resourcesRouter = require('./routes/resources');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'schemas')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/resources', resourcesRouter);

module.exports = app;
