const express = require('express');
const router = express.Router();
const Pasf = require('../../models/Pasf');
const User = require('../../models/User');

// Admin Layout
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Categories
router.get('/', (req, res)=>{
    Pasf.find({}).sort({date:'desc'}).then(pasfs=>{
        User.find({}).sort({lastName:'asc'}).then(users=>{ 
            res.render('admin/pasfs/index', {pasfs:pasfs, users:users});
        });
    });
});

// Get Form Create Post
router.get('/create/:id', (req, res)=>{
    User.findOne({_id: req.params.id}).then(userpasf=>{
        User.find({}).sort({lastName:'asc'}).then(users=>{
            res.render('admin/pasfs/create', {userpasf:userpasf, users:users});
        });
    });
});

// Post New Constat Form
router.post('/create/:id', (req, res)=>{

    let errors = [];

    if(!req.body.lastNamePasf){
        errors.push({message: 'please add a title'});
    }

    if (errors.length > 0){
        req.flash('error_message', `Constat De L'Agent error`);
        res.redirect('/admin/pasfs/create/'+req.params.id)
    } else {

        User.findOne({_id: req.params.id}).then(user=>{

            let okuniformePasf = true;
            let okcleKCPasf = true;
            let okcleservicePasf = true;
            let okbadgePasf = true;

            if(req.body.okuniformePasf){
                okuniformePasf = true;
            } else {
                okuniformePasf = false;
            }

            if(req.body.okcleKCPasf){
                okcleKCPasf = true;
            } else {
                okcleKCPasf = false;
            }

            if(req.body.okcleservicePasf){
                okcleservicePasf = true;
            } else {
                okcleservicePasf = false;
            }

            if(req.body.okbadgePasf){
                okbadgePasf = true;
            } else {
                okbadgePasf = false;
            }

            const newPasf = new Pasf({

                // Agent Conserné Hidden
                lastNamePasf: req.body.lastNamePasf,
                firstNamePasf: req.body.firstNamePasf,
                matriculePasf: req.body.matriculePasf,
                fonctionPasf: req.body.fonctionPasf,

                // Card 1
                etabliParPasf: req.body.etabliParPasf,
                fonctionetabliParPasf: req.body.fonctionetabliParPasf,
                datePasf: {
                    datedayPasf: req.body.datedayPasf,
                    datemonthPasf: req.body.datemonthPasf,
                    dateyearPasf: req.body.dateyearPasf
                },
                momentdePasf: {
                    momentdeheurePasf: req.body.momentdeheurePasf,
                    momentdeminutePasf: req.body.momentdeminutePasf
                },
                momentaPasf: {
                    momentaheurePasf: req.body.momentaheurePasf,
                    momentaminutePasf: req.body.momentaminutePasf
                },
                lignePasf: req.body.lignePasf,
                numeroderamePasf: req.body.numeroderamePasf,

                // Card 2
                motifPasf: req.body.motifPasf,
                amotifPasf: req.body.amotifPasf,
                lemotifPasf: req.body.lemotifPasf,

                // Card 3
                uniformePasf: {
                    okuniformePasf: okuniformePasf,
                    commentaireuniformePasf: req.body.commentaireuniformePasf
                },
                cleKCPasf: {
                    okcleKCPasf: okcleKCPasf,
                    commentairecleKCPasf: req.body.commentairecleKCPasf
                },
                cleservicePasf: {
                    okcleservicePasf: okcleservicePasf,
                    commentairecleservicePasf: req.body.commentairecleservicePasf
                },
                badgePasf: {
                    okbadgePasf: okbadgePasf,
                    commentairebadgePasf: req.body.commentairebadgePasf
                },

                // Card 4
                commandeitineraire: req.body.commandeitineraire,
                franshisementsignalrestrictif: req.body.franshisementsignalrestrictif,
                connaissancesignaux: req.body.connaissancesignaux,
                preceduredevantsignalrestrictif: req.body.preceduredevantsignalrestrictif,
    
            });

            user.pasfs.push(newPasf);
            user.save().then(savedUser=>{
                newPasf.save().then(savedPasf => {
                    req.flash('success_message', `Pasf De L'Agent ${savedPasf.lastNamePasf} ${savedPasf.firstNamePasf} Created Successfully`);
                    res.redirect('/admin/pasfs');
                }).catch(error => {
                    console.log('could not save pasf');
                    res.redirect('/admin/pasfs');
                });
            });
        });
    }
});


module.exports = router;