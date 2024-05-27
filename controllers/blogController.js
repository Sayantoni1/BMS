const Post = require('../models/postModel');

const loadBlog = async(req,res) =>{
    try {
        const posts = await Post.find({});
        res.render('blog',{posts:posts});
    } catch (error) {
        console.log(error.message);
    }
}

const loadPost = async(req,res) =>{
    try {
        const post = await Post.findOne({"_id":req.params.id});
        res.render('post',{post:post});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadBlog,
    loadPost
}