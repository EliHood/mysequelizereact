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
const port = process.env.PORT || 8000;
const passport = require('passport');
const path = require('path');
const allowOrigin = process.env.ALLOW_ORIGIN || '*'

// CORS Middleware
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



if (!process.env.PORT) {
  require('dotenv').config()
}

if (!process.env.PORT) {
  console.log('[api][port] 8000 set as default')
  console.log('[api][header] Access-Control-Allow-Origin: * set as default')
} else {
  console.log('[api][node] Loaded ENV vars from .env file')
  console.log(`[api][port] ${process.env.PORT}`)
  console.log(`[api][header] Access-Control-Allow-Origin: ${process.env.ALLOW_ORIGIN}`)
}

app.use(cors({
  origin: process.env.ALLOW_ORIGIN,
  credentials:false,
  allowedHeaders: 'X-Requested-With, Content-Type, Authorization, origin, X-Custom-Header',
  methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS',
  
}))
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false })); 




app.use(session({
  secret : process.env.JWT_SECRET,
  resave: false,
 saveUninitialized:true,
 cookie: {
  maxAge: 3600000 //1 Hour
}

}));



app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
require('./config/passport-github')(passport);
app.use('/api/users', userRoute )
app.use('/api/posts',  postRoute )
app.use(function(req, res, next) {
  res.locals.user = req.user; // This is the important line
  console.log(res.locals.user);
  next();
});






app.listen(port, () => {
  console.log('[api][listen] http://localhost:' + port)
})