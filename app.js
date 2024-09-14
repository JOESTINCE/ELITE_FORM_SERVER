var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var app = express();
var models = require("./models");
var connectMongoDb = require('./mongoDbModels/index');
require('./middleware/passport')(passport); // Import your Passport config

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Cache-Control", "no-cache ,no-store");
  next();
});
//passport
app.use(function (req, res, next) {

  if (req && req.headers && req.headers.authorization) {
    try{
      req.headers.authorization = require('./services/common.service').decrypt(req.headers.authorization);
    }
    catch(error){
      console.log('Error in token decryption', error.message);
    }
  };
  next();
});
//sequelize db connection
models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to Postgres database:", CONFIG.db_name);
    const shema = models.schemaCreate.then(() => {
      models.sequelize.sync().then(async () => {
        //mongoDB connection
        connectMongoDb();
      });
    });
  })
  .catch((err) => {
    console.error(
      "Unable to connect to Postgres database:",
      CONFIG.db_name,
      err.message
    );
  });


app.use('/', require('./routes/v1'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
