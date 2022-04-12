const nodeMailer =require('../config/nodemailer');


// module.exports =newComment , the below is another way exporting a method 
exports.newComment =(comment) => {
    //console.log('inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from: 'iamyashikajain18@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, 
    (err, info)=>{
        if(err){
            console.log('****Error', err);
            return;
        }

        //console.log('Message sent', info);
        return;
    });
}