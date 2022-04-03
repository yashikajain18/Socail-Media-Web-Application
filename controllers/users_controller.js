const User = require('../models/user');

module.exports.profile=function(req, res){
    // res.end('<h1> User Profile</h1>');
    return res.render('user_profile', {
        title: "User Profile"
    });
}

// render sign in page
module.exports.signIn=function(req, res){
    return res.render('user_sign_in', {
        title:"Codeial | Sign In"
    });
}
// render sign up page
module.exports.signUp=function(req, res){
    return res.render('user_sign_up', {
        title: " Codeial | Sign Up"
    });
}

//get the sign up data

module.exports.create =function(req, res){
    if(req.body.password != req.body.confirm_password){
        //console.log('1st');
        return res.redirect('back');
     }
    
    User.findOne({email: req.body.email}, function(err, user){
        console.log(user);
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            //console.log('3rd');
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up', err); return}

                return res.redirect('/users/sign-in');
            });
        }else{
            //console.log('4th');
            return res.redirect('back');
        }
    });
}

// sign in and create the session for the user
module.exports.createSession=function(req, res){
    //TODO later
}