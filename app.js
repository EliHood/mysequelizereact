var express = require('express');
var app = express();
var userRoute = require('./routes/users');
var postRoute  = require('./routes/posts');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require('./models');
var User = require('./models/user');
var session = require('express-session');
var cookieParser = require('cookie-parser') ;
var cookieSession = require('cookie-session');
var dotenv = require('dotenv');
var env = dotenv.config();
var cors = require('cors');
const port = process.env.PORT || 5000;
const passport = require('passport');
const path = require('path');



// CORS Middleware
app.use(cors());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 


app.use(session({
  secret : 'nodeauthsecret',
  resave: false,
 saveUninitialized: true,

}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(function(req, res, next) {
  res.locals.user = req.user; // This is the important line
  console.log(res.locals.user);
  next();
});



app.use('/api/users', userRoute )
app.use('/api/posts', postRoute )

app.listen(port, function() {
  console.log(`Server is running on ${port}`);
});
