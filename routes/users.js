var express = require('express');
var router = express.Router();
var models = require( '../models/');
var flash = require('express-flash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const BCRYPT_SALT_ROUNDS = 12;
const bcrypt = require('bcrypt');
var passportGitHub = require('../config/passport-github');
require('dotenv').config();



router.get('/auth/github', passport.authenticate('github') );

router.get('auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');

    console.log('this works');
});

router.get('/', async (req, res, next) =>{
  if(req.isAuthenticated()) {

      const user = await models.User.findAll();
      res.json(user);
      // res.status(200).send({ message: "users found", user:user});
  } else{
      res.status(401).send({ user: req.user, message: "log in again" });
      // console.log("something went wrong")
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

  // req.session.destroy();
  // req.user.logout();
  if( req.session.destroy() ){
    res.status(200).send({ message: "logout successfully"});
  }else{
    res.status(403).send({ message: "something went wrong"});
  }
  
});


router.post('/forgotPassword', (req, res, next) => {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  console.log(req.body.email);
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => {
    if (user === null) {
      console.log('email not in database');
      res.status(403).send('email not in db');
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: `${process.env.MAIL_USER}`,
          pass:`${process.env.MAIL_PASS}`
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: `${user.email}`,
        subject: `Link To Reset Password`,
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n` +
          `http://localhost:3000/reset/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  });
});

router.get('/reset', (req, res, next) => {
  models.User.findOne({
    where: {
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then(user => {
    if (user == null) {
      console.log('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        username: user.username,
        message: 'password reset link a-ok',
      });
    }
  });
});

router.put('/updatePassword', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.status(403).send(info.message);
    } else {
      models.User.findOne({
        where: {
          username: req.body.username,
        },
      }).then(user => {
        if (user != null) {
          console.log('user found in db');
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
              user.update({
                password: hashedPassword,
              });
            })
            .then(() => {
              console.log('password updated');
              res
                .status(200)
                .send({ auth: true, message: 'password updated' });
            });
        } else {
          console.log('no user exists in db to update');
          res.status(404).json('no user exists in db to update');
        }
      });
    }
  })(req, res, next);
});


router.put('/updatePassword', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.status(403).send(info.message);
    } else {
      models.User.findOne({
        where: {
          username: req.body.username,
        },
      }).then(user => {
        if (user != null) {
          console.log('user found in db');
          bcrypt
            .hash(req.body.password, BCRYPT_SALT_ROUNDS)
            .then(hashedPassword => {
              user.update({
                password: hashedPassword,
              });
            })
            .then(() => {
              console.log('password updated');
              res
                .status(200)
                .send({ auth: true, message: 'password updated' });
            });
        } else {
          console.log('no user exists in db to update');
          res.status(404).json('no user exists in db to update');
        }
      });
    }
  })(req, res, next);
});

router.get('/findUser', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else if (user.username === req.query.username) {
      User.findOne({
        where: {
          username: req.query.username,
        },
      }).then((user) => {
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
  })(req, res, next);
});

router.put('/updatePasswordViaEmail', (req, res, next) => {
  models.User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(user => {

    if (req.body.password === '') {
      console.log('please enter email');
      res.status(401).send('enter an email');
    }
    else if (user != null) {
      console.log('user exists in db');
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          });
        })
        .then(() => {
          console.log('password updated');
          res.status(200).send({ message: 'password updated' });
        });
    } 
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/signin');
}


module.exports = router;


