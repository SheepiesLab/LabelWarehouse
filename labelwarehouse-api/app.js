const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const resourcesRouter = require('./routes/resources');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/schemas', express.static(path.join(__dirname, 'schemas')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/resources', resourcesRouter);

module.exports = app;
