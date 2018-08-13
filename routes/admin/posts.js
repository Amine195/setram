const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { isEmpty, uploadDir } = require('../../helpers/upload-helpers');
const fs = require('fs');
const path = require('path');

// Layout Admin Panel
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Posts
router.get('/', (req, res)=>{
    Post.find({}).then(posts=>{
        res.render('admin/posts', {posts:posts});
    });
});

// View One Post
router.get('/view/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post=>{
        res.render('admin/posts/view', {post:post}); 
    });
});

// Get Form Create Post
router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

// Post Create Post
router.post('/create', (req, res)=>{

    let errors = [];

    if(!req.body.title){
        errors.push({message: 'please add a title'});
    }

    if(!req.body.body){
        errors.push({message: 'please add a description'});
    }

    if (errors.length > 0){
        res.render('admin/posts/create', {
            errors: errors
        });
    } else {

        let filename = 'No Image';
        let allowimage = false;

        if(!isEmpty(req.files)){
            
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            allowimage = true;


            file.mv('./public/uploads/' + filename, (err)=>{
                if(err) throw err;
            });
        }
        
        let allowComments = true;

        if(req.body.allowComments){
            allowComments = true;
        } else {
            allowComments = false;
        }

        const newPost = new Post({
            title: req.body.title,
            status : req.body.status,
            allowComments: allowComments,
            body: req.body.body,
            file: filename,
            allowFile: allowimage
        });

        newPost.save().then(savedPost => {
            req.flash('success_message', `Post ${savedPost.title} Created Successfully`);
            res.redirect('/admin/posts');
        }).catch(error => {
            console.log('could not save post');
            res.redirect('/admin/posts');
        });
    }
});

// Get Edit Post
router.get('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post=>{
        res.render('admin/posts/edit', {post:post}); 
    });
});

// Put(update) Post
router.put('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id})
    .then(post=>{

        if(req.body.allowComments){
            allowComments = true;
        } else {
            allowComments = false;
        }

        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;

        if(!isEmpty(req.files)){
            
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            post.file = filename;

            file.mv('./public/uploads/' + filename, (err)=>{
                if(err) throw err;
            });
        }

        post.save().then(updatedPost=>{
            req.flash('success_message', 'Post was successfuly Updated');
            res.redirect('/admin/posts');
        }).catch(error => {
            console.log('could not update post');
            res.redirect('/admin/posts');
        });
    });
});

// Delete Post
router.delete('/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post=>{
        fs.unlink(uploadDir + post.file, (err)=>{
            post.remove();
            req.flash('success_message', 'Post was successfuly Deleted');
            res.redirect('/admin/posts');
        });
    });
});

module.exports = router;