const passport = require("passport");
const GitHubStrategy = require('passport-github2').Strategy;
// const keys = require("../config/keys");

const models = require("../models/");

passport.serializeUser((user, done) => {
  // push to session
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  models.User.findOne({
    where: {
      id,
    },
  }).then(user => done(null, user))
  .catch(done);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.secret,
      callbackURL: 'http://127.0.0.1:8000/api/users/auth/github/callback',
      passReqToCallback: true,
      // profileFields: ['id', 'login']
    },
     (req, accessToken, refreshToken, profile, done) => {
       
			// console.log(profile);
      const { id,  login } = profile._json;
      const tempUser = { id, login, accessToken };
      console.log(tempUser);
      // console.log(accessToken);
      done(null, tempUser);
    }
  )
);

// passport.serializeUser((user, done) => {
//   // push to session
//   done(null, user.id);
// });

// passport.deserializeUser((userId, done) => {

//   // console.log('calling deserial' + userId); 
//   // // TODO: findByPk syntax? findById deprecated? Try later after sucessfully record data in DB
//   models.User
//       .find({ where: { id: userId } })
//       .then(function(user){
//         // console.log(user);
//        return  done(null, userId);
//       }).catch(function(err){
//         done(err, null);
//       });
//   // return done(null, id);
// });

// passport.deserializeUser((id, done) => {
//   models.User.findOne({
//     where: {
//       id,
//     },
//   }).then(user => done(null, user))
//   .catch(done);
// });
// passport.redirectIfLoggedIn = route => (req, res, next) =>
//   req.user ? res.redirect(route) : next();

// passport.redirectIfNotLoggedIn = route => (req, res, next) =>
//   req.user ? next() : res.redirect(route);

module.exports = passport;
