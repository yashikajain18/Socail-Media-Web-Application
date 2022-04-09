const passport = require('passport');
const User = require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req, res){
    // res.end('<h1> User Profile</h1>');
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    })
   
}

// module.exports.update=function(req, res){
//     if(req.user.id==req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
// }

module.exports.update= async function(req, res){
    if(req.user.id==req.params.id){
        try {
            let user=await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function(err){
                   if(err){
                       console.log("*****Multer Error:", err);
                   }
                   //Multer adds a body object and file object to the request object. 
                  //body object contains the values of the text fields of the form.
                  //file object contains the files uploaded via the form.
                   user.name=req.body.name;
                   user.email=req.body.email;
                  // console.log(req.file.filename);
                   if(req.file){
                       //checking if user already has a avatar  
                         if(user.avatar){
                            if(fs.existsSync(path.join(__dirname,"..",user.avatar))){
                                //deleting the file (old avatar)
                                fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                            }
                         }
                         //saving the path of uploaded file in avatar field of user
                         user.avatar= User.avatarPath+'/'+req.file.filename;
                   }
                   
                   user.save();
                   return res.redirect('back');
            });
            
        } catch (error) {
             req.flash('error', err);
             return res.redirect('back');
        }
        
        
    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

// render sign in page
module.exports.signIn=function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title:"Codeial | Sign In"
    });
}
// render sign up page
module.exports.signUp=function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: " Codeial | Sign Up"
    });
}

//get the sign up data

module.exports.create =function(req, res){
    if(req.body.password != req.body.confirm_password){
        
        return res.redirect('back');
     }
    
    User.findOne({email: req.body.email}, function(err, user){
        console.log(user);
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up', err); return}

                return res.redirect('/users/sign-in');
            });
        }else{
            
            return res.redirect('back');
        }
    });
}



// sign in and create the session for the user
module.exports.createSession=function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

// sign out
module.exports.destroySession=function(req, res){
    /*Passport exposes a logout() function on req that can be called from any 
    route handler which needs to terminate a login session.
    Invoking logout() will remove the req.user property and clear the login session 
    */ 
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/')
}