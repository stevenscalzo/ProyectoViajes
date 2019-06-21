var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelsRouter = require('./routes/travels'); 
var apiTravel = require('./routes/api/travels');
//var apiUser = require('./routes/api/users');
//var travelsApiRouter = require('./routes/api/travelsApi'); 

var app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use(session({
  secret: 'miClaveSecreta',
  name: 'sesionUsuario',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

// view engine setup
app.use((req, res, next) => {
  res.locals.user = req.session;
  next();
})
app.use('/imagen', express.static('uploads'));

app.use('/components', express.static(`${__dirname}/public/components`));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/destinos', travelsRouter); 
app.use('/api/travel', apiTravel);
//app.use('/api/user', apiUser);

//app.use('/api/films', travelsApiRouter); 


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
