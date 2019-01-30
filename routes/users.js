var express = require('express');
var router = express.Router();
var db = require('../models');
var User = db.User
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);

router.get('/', function(req, res) {
    User.findAll()
      .then(function (users) {
        res.json(users);
      });
});

router.post('/new', function(req, res, next) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email, 
  
  }).then( user => {
    req.session.user = user.dataValues;
    res.status(200).send({msg: "User Created"})
  }).catch(err => next(err))
});


router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    where: {email: email}
    
  }).then((user) => {
    if (!user) {
      return res.status(401).send({
        message: 'Authentication failed. User not found.',
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(isMatch && !err) {
        var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
        jwt.verify(token, 'nodeauthsecret', function(err, data){
          console.log(err, data);
        })
        res.json({success: true, token: 'JWT ' + token});
      } else {
        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
      }
    })
  })
  .catch((error) => res.status(400).send(error));
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;


