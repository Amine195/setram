const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Admin Layout
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Categories
router.get('/', (req, res)=>{
    User.find({}).then(users=>{
        res.render('admin/users/index', {users:users});
    });
});

module.exports = router;