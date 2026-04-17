require('dotenv').config();
var createError = require('http-errors');
var express     = require('express');
var path        = require('path');
var hbs         = require('hbs');
var cookieParser = require('cookie-parser'); // ✅ Added missing cookie-parser
var logger      = require('morgan');          // ✅ Added missing morgan logger

// Connect to MongoDB via Mongoose
require('./app_api/models/db');
require('./app_api/models/travlr');           // ✅ Added missing travlr model
require('./app_api/models/user');
require('./app_api/config/passport');

const passport = require('passport');

// Routers
var indexRouter  = require('./app_server/routes/index');
var usersRouter  = require('./app_server/routes/users'); // ✅ Restored users router
var apiRouter    = require('./app_api/routes/index');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register Handlebars partials directory
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(logger('dev'));                               // ✅ Added morgan logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());                             // ✅ Added cookie-parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// CORS scoped to /api only (includes Authorization header for JWT)
app.use('/api', (req, res, next) => {               // ✅ Removed duplicate global CORS, scoped to /api
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Wire up routes
app.use('/',       indexRouter);
app.use('/users',  usersRouter);                    // ✅ Restored /users route
app.use('/api',    apiRouter);

// JWT unauthorized error handler                   // ✅ Correct 4-arg error handler signature
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: `${err.name}: ${err.message}` });
  }
});

// 404 handler
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler                            // ✅ Fixed swapped (res, req) → (req, res)
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;