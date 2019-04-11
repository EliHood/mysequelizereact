var express = require('express');
var app = express();
var userRoute = require('./routes/users');
var postRoute  = require('./routes/posts');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser') ;
var dotenv = require('dotenv');
var env = dotenv.config();
var cors = require('cors');
var models = require('./models/');
const host = '0.0.0.0';
const PORT = process.env.PORT || 8000;
const passport = require('passport');
const path = require('path');
// const allowOrigin = process.env.ALLOW_ORIGIN || '*'
// CORS Middleware
if (!process.env.PORT) {
  require('dotenv').config()
}

// console.log(process.env.DATABASE_URL);
if (!process.env.PORT) {
  console.log('[api][port] 8000 set as default')
  console.log('[api][header] Access-Control-Allow-Origin: * set as default')
} else {
  console.log('[api][node] Loaded ENV vars from .env file')
  console.log(`[api][port] ${process.env.PORT}`)
  console.log(`[api][header] Access-Control-Allow-Origin: ${process.env.ALLOW_ORIGIN}`)
}
require('./config/passport-github');
require('./config/passport');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(session({
  secret : process.env.JWT_SECRET,
  saveUninitialized: false,
  maxAge: 1000 * 60 * 60 * 84,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false})); 
const isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()){
    next();
    console.log('this works');
  }else{
   res.redirect('http://127.0.0.1:8001/signIn');
  }
}
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   // res.header('Access-Control-Allow-Credentials',  true);
//   res.header("preflightContinue", false)
//   // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.use(cors({
    'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
    'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
app.use('/api/users', userRoute );
app.use('/api/posts', isAuthenticated,  postRoute );
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}



app.use(function(req, res, next) {
  res.locals.user = req.user; // This is the important line
  // req.session.user = user
  console.log(res.locals.user);
  next();
});

app.listen(PORT, host, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

