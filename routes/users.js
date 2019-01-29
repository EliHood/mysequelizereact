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
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    email: req.body.email 
  }).then( user => {
    res.status(200).send({msg: "User Created"})
  }).catch(err => next(err))
});


module.exports = router;

