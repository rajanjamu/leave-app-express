const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport'),
      User      = require('../models/user');

// ROOT
router.get('/', (req, res) => {
    res.redirect('/leaves/employee');
});

// REGISTER FORM
router.get('/register', (req, res) => {
    if (req.user) {
        req.flash('error', 'Already logged in!');

        if (req.user.admin === true) {
            return res.redirect('/leaves/manager');
        } else {
            return res.redirect('/leaves/employee');
        }
    }
    res.render('register');
});

// LOGIN FORM
router.get('/login', (req, res) => {
    if (req.user) {
        req.flash('error', 'Already logged in!');

        if (req.user.admin === true) {
            return res.redirect('/leaves/manager');
        } else {
            return res.redirect('/leaves/employee');
        }
        
    }
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully!')
    res.redirect('/login');
});

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            console.log('success')
            req.flash('success', 'Welcome, ' + user.username);
            res.redirect('/leaves/employee');
        });
    });
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password!',
    successFlash: 'You are logged in!'
}), (req, res) => {
    if (req.user.admin === true) {
        return res.redirect('/leaves/manager');
    }
    
    res.redirect('/leaves/employee');
    req.flash('success', 'You are logged in!');
});

module.exports = router;