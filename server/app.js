const express = require('express');
const appSession = require('./config/session');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const InitDB = require('./config/db');
const debug = require("debug")('sft2:app');

// App routers
var authRouter = require('./routes/auth');

// Init MongoDB
InitDB();

// Init ExpressJS
var app = express();

// App middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(appSession);

// App routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return the error status
  res.status(err.status || 500);
});

module.exports = app;
