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
var cors = require('cors');
const port = process.env.PORT || 5000;
const passport = require('passport');

require('./config/passport');

// CORS Middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session()) ;

app.use('/api/users', userRoute )


app.listen(port, function() {
  console.log(`Server is running on ${port}`);
});
