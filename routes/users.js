var express = require('express');
var router = express.Router();
var models = require( '../models/');
const jwt = require('jsonwebtoken');
const passport = require('passport');


router.get('/', function(req, res) {
    models.User.findAll()
      .then(function (users) {
        res.json(users);
        // console.log(users);
      });

 
});

router.get('/findUser', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else {
      if (user.username === req.query.username) {
        models.User.findOne({
          where: {
            username: req.query.username,
          },
        }).then(user => {
          if (user != null) {
            console.log('user found in db from findUsers');
            res.status(200).send({
              auth: true,
              email: user.email,
              username: user.username,
              password: user.password,
              message: 'user found in db',
            });
          } else {
            console.log('no user exists in db with that username');
            res.status(401).send('no user exists in db with that username');
          }
        });
      } else {
        console.log('jwt id and username do not match');
        res.status(403).send('username and jwt token do not match');
      }
    }
  })(req, res, next);
});



router.post('/new', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.status(403).send(info.message);
    } else {
      req.logIn(user, err => {
        const data = {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
        };
        models.User.findOne({
          where: {
            username: data.username,
          },
        }).then(user => {
          user
            .create({
              username: data.username,
              password: data.password,
              email: data.email
            })
            .then(() => {
              console.log('user created in db');
              res.status(200).send({ message: 'user created' });
            });
        });
      });
    }
  })(req, res, next);
});

router.post('/loginUser', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
       models.User.findOne({
          where: {
            username: req.body.username,
          },
        }).then(user => {
          const token = jwt.sign({ id: user.id  }, 'nodeauthsecret');
          res.status(200).send({
            auth: true,
            token: token,
            message: 'user found & logged in',
          });
        });
      });
    }
  })(req, res, next);
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


