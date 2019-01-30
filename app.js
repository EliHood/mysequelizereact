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
app.use(bodyParser.urlencoded({ extended: true}));
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


app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user){
    res.clearCookie('user_sid');
  }
  next();
})



app.get('/api', (req, res) => {
  res.status(200).send({ inSession: (req.session.user && req.cookies.user_sid)
  });
});

app.use('/api/users', userRoute )


app.listen(5000, function() {
  models.sequelize.sync();
});
