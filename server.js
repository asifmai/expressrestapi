const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// MiddleWares
app.use(logger('dev'));
app.use(express.json({ extended: true, limit: '200mb' }));
app.use(cors());

// Define Routes
app.get('/', (req, res) => res.status(200).send('API Running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Page Not Found');
});

module.exports = app;
