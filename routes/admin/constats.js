const express = require('express');
const router = express.Router();
const Constat = require('../../models/Constat');
const User = require('../../models/User');

// Admin Layout
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Categories
router.get('/', (req, res)=>{
    Constat.find({}).sort({date:'desc'}).then(constats=>{
        User.find({}).sort({lastName:'asc'}).then(users=>{ 
            res.render('admin/constats/index', {constats:constats, users:users});
        });
    });
});

// Get Form Create Post
router.get('/create/:id', (req, res)=>{
    User.findOne({_id: req.params.id}).then(userconstat=>{
        User.find({}).sort({lastName:'asc'}).then(users=>{
            res.render('admin/constats/create', {userconstat:userconstat, users:users});
        });
    });
});

// Post New Constat Form
router.post('/create/:id', (req, res)=>{

    let errors = [];

    if(!req.body.etabliParConstat){
        errors.push({message: 'please add a title'});
    }

    if (errors.length > 0){
        req.flash('error_message', `Constat De L'Agent error`);
        res.redirect('/admin/constats/create/'+req.params.id)
    } else {

        const newConstat = new Constat({

            etabliParConstat: req.body.etabliParConstat,
            agentConserneConstat: req.body.agentConserneConstat,
            createConstat: {
                createdayConstat: req.body.createdayConstat,
                createmonthConstat: req.body.createmonthConstat,
                createyearConstat: req.body.createyearConstat
            },
            lastNameConstat: req.body.lastNameConstat,
            firstNameConstat: req.body.firstNameConstat,
            matriculeConstat: req.body.matriculeConstat,
            fonctionConstat: req.body.fonctionConstat,
            serviceAgentConstat: req.body.serviceAgentConstat,
            priseServiceConstat: req.body.priseServiceConstat,
            finServiceConstat: req.body.finServiceConstat,
            motifConstat: req.body.motifConstat,
            resumeFaitConstat: req.body.resumeFaitConstat,
            explicationAgentConstat: req.body.explicationAgentConstat

        });

        newConstat.save().then(savedConstat => {
            req.flash('success_message', `Constat De L'Agent ${savedConstat.agentConserneConstat} Created Successfully`);
            res.redirect('/admin/constats');
        }).catch(error => {
            console.log('could not save post');
            res.redirect('/admin/constats');
        });
    }
});



module.exports = router;