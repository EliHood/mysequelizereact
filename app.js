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


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 


// allowCrossDomain = function(req, res, next) {
// res.header('Access-Control-Allow-Origin', 'http://localhost:8000'); // your website
// res.header('Access-Control-Allow-Credentials', 'true');
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// if ('OPTIONS' === req.method) {
//     res.send(200);
// } else {
//     next();
// }};

app.use(cors({
  origin: process.env.ALLOW_ORIGIN,
  credentials: true,
  allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
  methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS'
}))

app.use(session({
  secret : 'nodeauthsecret',
  resave: false,
 saveUninitialized: true,

}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
require('./config/passport-github')(passport);

app.use(function(req, res, next) {
  res.locals.user = req.user; // This is the important line
  console.log(res.locals.user);
  next();
});
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });



app.use('/api/users', userRoute )

app.use('/api/posts',  postRoute )




app.listen(port, () => {
  console.log('[api][listen] http://localhost:' + port)
})