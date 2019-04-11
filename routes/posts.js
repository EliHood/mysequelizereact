var express = require('express');
var router = express.Router();
var models = require( '../models/');
const passport = require('passport');
router.get('/myPosts',  (req, res) =>{
    models.Post.findAll({ order:[ 
        ['createdAt', 'DESC'],
        ], limit: 6 })
       .then( (posts) =>{
           res.json(posts);
        //    console.log(posts);
       })
});
const isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
      next();
      console.log('this works');
    }else{
      next( new Error(401));
    }
}
router.get('/post', (req, res, user) => {
    console.log('post get found');
});
router.post('/newPost' ,  (req, res, user) => {
    const data = {
        title: req.body.title,
        post_content: req.body.post_content,
        userId: req.user.id, 
        username: req.user.username
    }
    res.json(data);
    if(data.title || data.post_content != null){
        models.Post.create({
            title: data.title, 
            post_content: data.post_content,
            userId: data.userId,
            username: data.username
        }).then( (post) => {
            res.status(200).send({
                message: 'post created',
                post: post
             });
        }).catch( (err) => {
            res.status(401).send({
                message: `Something went wrong ${err}`
            });
        })
    }else{
        res.status(401).send({
            message: 'Post is null'
        });
    }
});
module.exports = router;