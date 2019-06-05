var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose'); // require in mongoose for connection to MongoDB
mongoose.connect(`mongodb+srv://kmueller:066981408@cluster0-bu7ln.mongodb.net/test?retryWrites=true&w=majority`, 
{
  useNewUrlParser: true // Include this so we dont get deprescation warning
});

var db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connection to mongoose successfull'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles'); // Import articles router

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter); //everything at /artiles wiil be handled by my articles router

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
  res.render('error');
});

module.exports = app;
