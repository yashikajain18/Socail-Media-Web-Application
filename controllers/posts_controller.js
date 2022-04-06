const Post = require('../models/post')

module.exports.post=function(req, res){
    return res.end('<h1> Posts </h1>');
}