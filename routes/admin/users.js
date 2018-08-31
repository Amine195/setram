const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { isEmpty, uploadDir } = require('../../helpers/upload-helpers');
const fs = require('fs');

// Layout Admin Panel
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

// Get Index Users
router.get('/', (req, res)=>{
    User.find({}).then(users=>{
        res.render('admin/users/index', {users:users});
    });
});

// Get Conducteur
router.get('/conducteur', (req, res)=>{
    User.find({status: "Conducteur"}).then(users=>{
        res.render('admin/users/index', {users:users});
    });
});

// Get AMT
router.get('/agent_de_maitrise', (req, res)=>{
    User.find({status: "Agent de Maitrise"}).then(users=>{
        res.render('admin/users/index', {users:users});
    });
});

// Get New User
router.get('/create', (req, res)=>{
    res.render('admin/users/create');
});

// Post New User Form
router.post('/create', (req, res)=>{
    
    let errors = [];

    if(!req.body.email){ errors.push({message: 'Veuillez Entrer Un Email.'}); }
    if(!req.body.password){ errors.push({message: 'Veuillez Entrer Un Mot de Passe.'}); }
    if(!req.body.firstName){ errors.push({message: 'Veuillez Entrer Un Nom.'}); }
    if(!req.body.lastName){ errors.push({message: 'Veuillez Entrer Un Prénom.'}); }
    if(!req.body.address){ errors.push({message: 'Veuillez Entrer Une Address.'}); }
    if(!req.body.phone){ errors.push({message: 'Veuillez Entrer Un Numéro de Téléphone.'}); }
    if(!req.body.certificate){ errors.push({message: 'Veuillez Entrer Un Diplome.'}); }
    if(!req.body.situation){ errors.push({message: 'Veuillez Selectionner une Situation Familiale.'}); }
    if(!req.body.birthday){ errors.push({message: 'Veuillez Selectionner une Journée de Naissance.'}); }
    if(!req.body.birthmonth){ errors.push({message: 'Veuillez Selectionner un Mois de Naissance.'}); }
    if(!req.body.birthyear){ errors.push({message: 'Veuillez Selectionner une Année de Naissance.'}); }
    if(!req.body.matricule){ errors.push({message: 'Veuillez Entrer Un Matricule.'}); }
    if(!req.body.habilitation){ errors.push({message: "Veuillez Entrer Un Numéro d'habilitation."}); }
    if(!req.body.status){ errors.push({message: 'Veuillez Selectionner Un Status Professionel.'}); }
    if(!req.body.admitionday){ errors.push({message: "Veuillez Selectionner une Journée d'admition."}); }
    if(!req.body.admitionmonth){ errors.push({message: "Veuillez Selectionner un Mois d'admition."}); }
    if(!req.body.admitionyear){ errors.push({message: "Veuillez Selectionner une Année d'admition."}); }
    if(req.body.password !== req.body.passwordConfirm){ errors.push({message: "Veuillez Vérifier Le Mot de Passe"}); }

    if (errors.length > 0){
        
        res.render('admin/users/create', {
            errors: errors,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            certificate: req.body.certificate,
            situation: req.body.situation,
            birthday: req.body.birthday,
            birthmonth: req.body.birthmonth,
            birthyear: req.body.birthyear,
            matricule: req.body.matricule,
            habilitation: req.body.habilitation,
            status: req.body.status,
            admitionday: req.body.admitionday,
            admitionmonth: req.body.admitionmonth,
            admitionyear: req.body.admitionyear
        });

    } else {

        User.findOne({email: req.body.email}).then(user=>{
            
            if(!user){

                let filename = 'No Image';

                if(!isEmpty(req.files)){
                    
                    let file = req.files.file;
                    filename = Date.now() + '-' + file.name;

                    file.mv('./public/uploads/' + filename, (err)=>{
                        if(err) throw err;
                    });
                }

                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    phone: req.body.phone,
                    certificate: req.body.certificate,
                    situation: req.body.situation,

                    birth: {
                        birthday: req.body.birthday,
                        birthmonth: req.body.birthmonth,
                        birthyear: req.body.birthyear
                    },

                    matricule: req.body.matricule,
                    habilitation: req.body.habilitation,
                    status: req.body.status,

                    admition: {
                        admitionday: req.body.admitionday,
                        admitionmonth: req.body.admitionmonth,
                        admitionyear: req.body.admitionyear
                    },

                    file: filename
                });
        
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        newUser.password = hash
                        newUser.save().then(saveUser=>{
                            req.flash('success_message', `Le Compte ${saveUser.email} est Créé avec succès`);
                            res.redirect('/admin/users');
                        });
                    });
                });
            } else {
                req.flash('error_message', 'That email exist please login');
                res.redirect('/admin/users');
            }
        });
    }
});

// View Profile One User
router.get('/view/:id', (req, res)=>{
    User.findOne({_id: req.params.id}).populate('constats').populate('pasfs').then(userview=>{
        res.render('admin/users/view', {userview:userview});
    });
});



module.exports = router;