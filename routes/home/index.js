const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');

// Layout Admin Panel
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home';
    next();
});

// Get HomePage Posts
router.get('/', (req, res)=>{
    Post.find({}).sort({date:'desc'}).then(posts =>{
        Category.find({}).then(categories=>{
            res.render('home/index', {posts: posts, categories:categories});
        });
    });
});

// Get HomePage One Post
router.get('/post/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post =>{
        Category.find({}).then(categories=>{
            res.render('home/post', {post:post, categories:categories});
        });
    });
});

// Get About Page
router.get('/about', (req, res)=>{
    res.render('home/about');
});

module.exports = router;
