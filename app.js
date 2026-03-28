var createError = require('http-errors');
var express     = require('express');
var path        = require('path');
var hbs         = require('hbs');

// Connect to MongoDB via Mongoose
require('./app_server/models/db');

var indexRouter  = require('./app_server/routes/index');
var travelRouter = require('./app_server/routes/travel');

var app = express();

// View engine setup — point to app_server/views
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register Handlebars partials directory
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',       indexRouter);
app.use('/travel', travelRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;