const GitHubStrategy = require('passport-github2').Strategy;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require("../models/");

// passport.serializeUser((user, done) => {
//   // push to session
//   done(null, user.id);
//   console.log(user.id)
// });


// passport.deserializeUser((id, done) => {
//   models.User.findOne({
//     where: {
//       id,
//     },
//   }).then(user => done(null, user))
//   .catch(done);
// });
module.exports = async  (passport) => {

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.secret,
      callbackURL: 'http://localhost:8000/api/users/auth/github/callback',
      passReqToCallback: true,
      profileFields: ['id', 'login']
    },
     (req, accessToken, refreshToken, profile, done) => {
       const { id,  login, email} = profile._json;  
       console.log(`backbro ${id}`);
      //  console.log(req)
       models.User.findOne({
         where:{
           id: id
         }
       }).then( user => {
        //  if user is found
         if(user){
           return done(null, user)
         }
        //  else create new user
         else{
           models.User.create({
             id: id,
             username:login,
             email: email,
             createdAt: Date.now()
           }).then( user => {
             console.log('github user created');
             return done(null, user);
           })
         }
       })
    }
  )
);

passport.serializeUser((user, done) => {
  // push to session
 done(null, user.id);
});

passport.deserializeUser((userId, done) => {

  // console.log('calling deserial' + userId); 
  // // TODO: findByPk syntax? findById deprecated? Try later after sucessfully record data in DB
  models.User
      .findOne({ where: { id: userId } })
      .then(function(user){
        // console.log(user);
         done(null, userId);
      }).catch(function(err){
        done(err, null);
      });
  // return done(null, id);
});


}
