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
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(session({
  secret : process.env.JWT_SECRET,
}));
require('./config/passport.js')(passport); // PASSPORT Init
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended:false})); 
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.locals.user = req.user; // This is the important line
  // req.session.user = user
  console.log(res.locals.user);
  next();
});
// this code may be useless or useful, still trying to understand cors. 
app.use((req, res, next) => {
  const { headers } = req;
  res.header('Access-Control-Allow-Origin', headers.origin);
  res.header('Access-Control-Allow-Headers', headers);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors({
  origin: process.env.ALLOW_ORIGIN,
  credentials: true,
  allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
  methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS'
}))
app.use('/api/users', userRoute );
app.use('/api/posts', postRoute );
// In order to use REACT + EXPRESS we need the following code, alone with a build
// in the client folder we run a npm run build in the client folder then it is referred
// in the following code. 
app.use(express.static(path.join(__dirname, 'client/build')));
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})
models.sequelize.sync().then(function() {
  app.listen(PORT, host, () => {
    console.log('[api][listen] http://localhost:' + PORT)
  })
})
