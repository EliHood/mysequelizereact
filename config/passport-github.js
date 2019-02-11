const GitHubStrategy = require('passport-github').Strategy;
const models = require( '../models/index');
require('dotenv').config();


module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
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
      callbackURL: 'http://127.0.0.1:3000/api/users/auth/github/callback'
  
    },
    function(accessToken, refreshToken, profile, cb) {
      models.User.findOne({ 'id': profile.id }, function (err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          models.User.create({
            id: profile.id,
            username: profile.displayName,
            createdAt: Date.now()

          }).then(user => {
            console.log('user created');
            return done(null, user);
          });
         
        }
      });
    }
  ));
};

