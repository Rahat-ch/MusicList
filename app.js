const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon'); // eslint-disable-line
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session')({
  secret: 'any random string can go here',
  resave: false,
  saveUninitialized: false,
});
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const User = require('./models/user');

const index = require('./routes/index');
const api = require('./routes/api/index');
const users = require('./routes/api/users');

const app = express();

// Connect Mongoose
mongoose.connect('mongodb://localhost/musiclist');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Wepback server
const webpackCompiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: true,
    'errors-only': true,
  },
}));
app.use(webpackHotMiddleware(webpackCompiler, {
  log: console.log,
}));

app.use('/api', api);
app.use('/api/users', users);
app.use('/*', index);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
