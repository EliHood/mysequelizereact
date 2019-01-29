var express = require('express');
var router = express.Router();
var db = require('../models');
var User = db.User


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


module.exports = router;

