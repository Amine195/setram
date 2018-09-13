const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Pasf = require('../../models/Pasf');
const Constat = require('../../models/Constat');

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    res.render('admin/index');
});

router.get('/dashboard', (req, res)=>{
    Post.count().then(postCount=>{
        Comment.count().then(commentCount=>{
            Pasf.count().then(pasfCount=>{
                Constat.count().then(constatCount=>{
                    res.render('admin/dashboard', {postCount: postCount, commentCount: commentCount, pasfCount: pasfCount, constatCount: constatCount});
                });
            });
        });
    });
});

module.exports = router;