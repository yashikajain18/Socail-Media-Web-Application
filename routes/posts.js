const express=require('express');

const router =express.Router();

const postController = require('../controllers/posts_controller');

router.get('/likes', postController.post);


module.exports=router;