const nodeMailer = require("../config/nodemailer");

module.exports.resetPassword = function(accessToken){

    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password.ejs");

    nodeMailer.transporter.sendMail({
        from: 'iamyashikajain18@gmail.com', // sender address
        to: accessToken.user.email, // list of receivers
        subject: "Codeial : Reset Password", // Subject line
        html: htmlString // html body
      } , function(err , info){
          if(err){
              console.log("Error in sending mail",err);
              return;
          }
          console.log("Message Sent" , info);
          return;
      });
}


