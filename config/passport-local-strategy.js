const passport = require('passport');

const LocalStratgey=require('passport-local').Strategy;

const User = require('../models/user');
// authentication using passport
passport.use(new LocalStratgey({
    usernameField: 'email'
},
  function(email, password, done){
      // find a user and establish the identity
      User.findOne({email: email}, function(err, user){
           if(err){
             console.log('error in finding user--> Passport'); 
             return done(err);
            }

            if(!user|| user.password!=password){
              console.log("invalid username/password");
              return done(null, false);
            }

            return done(null, user);
      });
  }
));

//serailizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
  done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      if(err){
         console.log('error in finding user--> Passport'); 
         return done(err);
      }

      return done(null, user);
  });
});

//check if usre is authenticated
passport.checkAuthentication=function(req, res, next){
  // if the user is signed in pass on the request to the next function(controller)
     if(req.isAuthenticated()){
        return next();
     }
     // if user is not signed in
     return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    //req.user contains the curent signed in user form session coookie 
    //and we're just sending this to locals for the views
    res.locals.user=req.user
  }
  next();
}
module.exports = passport;