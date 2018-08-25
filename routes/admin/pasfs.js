const express = require('express');
const router = express.Router();
const Constat = require('../../models/Pasf');

// Admin Layout
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Categories
router.get('/', (req, res)=>{
    Pasf.find({}).sort({date:'desc'}).then(pasfs=>{
        res.render('admin/pasfs/index', {pasfs:pasfs});
    });
});

// Get Form Create Post
router.get('/create', (req, res)=>{
    res.render('admin/pasfs/create');
});


module.exports = router;