var express = require('express');
var router = express.Router();
var models = require( '../models/');
const jwt = require('jsonwebtoken');
const passport = require('passport');


router.get('/', function(req, res) {

  if(req.isAuthenticated()) {

    models.User.findAll()
    .then(function (users) {
      res.json(users);
      // console.log(users);
    });
    
  } else {
    res.status(401).send({ user: req.user, message: "not logged in" });
    // console.log(req.user);
  }


 
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
        }) .then(() => {
            console.log('user created in db');
            res.status(200).send({ message: 'user created' });
          });
     
      });
    }
  })(req, res, next);
});

router.post('/loginUser',  passport.authenticate('login', {session: true}), (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
    }

    if (info != undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
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
          // console.log(req.user)

        });
      });
    }
  })(req, res, next);
});


router.get('/logout', function( req, res){

  req.session.destroy();
  req.logout();
  res.status(200).send({ message: "logout successfully"});
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/signin');
}


module.exports = router;


