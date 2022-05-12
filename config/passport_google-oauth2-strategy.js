const passport=require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');
const User =require('../models/user');
const env=require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
      clientID: env.google_clientID,//"406179239876-896b969veqe36o8464pin29cclu9pnuo.apps.googleusercontent.com",
      clientSecret: env.google_clientSecret, //"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",
      callbackURL: env.google_callbackURL //"http://localhost:8000/users/auth/google/callback"
},

       function(accessToken, refreshToken, profile, done){
           // find a user
             User.findOne({email: profile.emails[0].value}).exec(function(err, user){
                 if(err){
                     console.log('error in google startegy-passort', err);
                     return;
                 }
                 console.log(profile);
                 if(user){
                     // if found set this user as req.user
                     return done(null, user);
                 }else{
                     // if not found, create the user and set it as req.user
                     User.create({
                         name: profile.name,
                         email: profile.emails[0].value,
                         password: crypto.randomBytes(20).toString(hex)
                     }, function(err, user){
                        if(err){
                            console.log('error in google startegy-passort', err);
                            return;
                        }
                        return done(null, user);
                     })
                 }

             });
       }
));