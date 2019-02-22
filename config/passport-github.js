
require('dotenv').config();


module.exports = function(passport) {
const GitHubStrategy = require('passport-github').Strategy;
const models = require( '../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

  passport.serializeUser(function(userId, done) {
    done(null, userId);
  });

  // from the user id, figure out who the user is...
  passport.deserializeUser(function(userId, done){
    models.User
      .find({ where: { id: userId } })
      .then(function(user){
        done(null, user);
      }).catch(function(err){
        done(err, null);
      });
  });
  passport.use(new GitHubStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.secret,
      // if the callback is set to 5000 the 0auth app will not work for some reason
      callbackURL: 'http://127.0.0.1:8000/api/users/auth/github/callback',
      passReqToCallback: true,

  
    },
    function(accessToken, req, token, refreshToken, profile,done) {
      // successfully makes a new user with id, and username equivalant to github username
        models.User
        .findOrCreate({
          where: {
            [Op.or]: [
              {
                id: profile.id,
                username:profile.username
              }
            ],
          }
        })
        .then( (user, created) => {
           return done(null, user, profile, token, accessToken)
        });      
    }
  ));




};

