const express = require('express');
const router = express.Router();
const Constat = require('../../models/Constat');

// Admin Layout
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Categories
router.get('/', (req, res)=>{
    Constat.find({}).sort({date:'desc'}).then(constats=>{
        res.render('admin/constats/index', {constats:constats});
    });
});

// Get Form Create Post
router.get('/create', (req, res)=>{
    res.render('admin/constats/create');
});


module.exports = router;