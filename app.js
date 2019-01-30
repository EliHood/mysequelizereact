var express = require('express');
var app = express();
var userRoute = require('./routes/users');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require('./models');
var session = require('express-session');
var cookieParser = require('cookie-parser') ;
var dotenv = require('dotenv');
var env = dotenv.config();
const port = process.env.PORT || 5000;



app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

app.use(session({
  key:'user_sid',
  secret: 'something',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));


app.use('/api/users', userRoute )


app.listen(port, function() {
  models.sequelize.sync();
});
