var express = require('express');
var app = express();
var userRoute = require('./routes/users');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require('./models');
var session = require('express-session');
var cookieParser = require('cookie-parser') ;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  cookie: {
    expires: 600000
  }
}))


app.use('/users', userRoute )


app.listen(5000, function() {
  models.sequelize.sync();
});
