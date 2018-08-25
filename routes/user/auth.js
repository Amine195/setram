const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Layout Admin Panel
router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'connect';
    next();
});

// Get Login Page
router.get('/', (req, res)=>{
    res.render('home/login');
});

// Post Login Page
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user) return done(null, false, {message: "Cette Email N'existe Pas"})
        
        bcrypt.compare(password, user.password, (err, matched)=>{
            if(err) return err;

            if(matched){
                return done(null, user);
            } else {
                return done(null, false, { message: 'Mot De Passe Incorrect' });
            }

        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

router.post('/', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/admin/users',
        failureRedirect: '/auth',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/auth');
})

module.exports = router;
