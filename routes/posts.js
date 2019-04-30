var express = require('express');
var router = express.Router();
var models = require( '../models/');
const passport = require('passport');
const util = require('../util');
const sequelize = require('sequelize');
router.get('/myPosts',  async  (req, res) =>{
   await models.Post.findAll({ 
        include:[{
            model:models.Likes,    
        }],  
        order:[ 
        ['createdAt', 'DESC'],
        ], limit: 6 }, )
      
       .then( (posts) =>{
           res.json(posts);
            
       })
});
router.get('/post', (req, res, user) => {
    console.log('post get found');
});

router.post('/delete/:id', (req, res) => {
    const id = req.params.id;

    console.log('this works' + id);
    models.Post.destroy({
        where: {
            id: id
        }
    }).then( ()=> {
        res.status(200).send('Post has been deleted!')
    }).catch(err => {
        res.status(401).send("Failed to delete");
    })
});

router.put('/edit/:id', (req, res) => {
    const id = req.params.id;

    console.log('this works' + id);
    models.Post.update({
        title: req.body.title
    }, { where: {
            id: id
        }
    }).then( (post)=> {
        res.status(200).send('Post has been edited!' + post.title)
    }).catch(err => {
        res.status(401).send("Failed to edit");
    })
});

router.post('/like', (req, res)=> {
  
    models.Likes.create({
        postId: req.body.postId,
        userId:  req.user.id,
        like:true
    }).then( () => {
        res.status(200).send({
            message: 'You have like this post',
        });
    }).catch( (err) => {
        res.status(401).send({
            message: "Something went wrong",
            err: err
        })
    })

})


router.post('/newPost', util.ensureAuthenticated ,  (req, res, user) => {
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