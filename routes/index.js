const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport'),
      User      = require('../models/user');

// ROOT
router.get('/', (req, res) => {
    res.redirect('/leaves');
});

// REGISTER FORM
router.get('/register', (req, res) => {
    if (req.user) {
        req.flash('error', 'Already logged in!');
        return res.redirect('/leaves');
    }
    res.render('register');
});

// LOGIN FORM
router.get('/login', (req, res) => {
    if (req.user) {
        req.flash('error', 'Already logged in!');
        return res.redirect('/leaves');
    }
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out successfully!')
    res.redirect('/login');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome, ' + user.username);
            res.redirect('/leaves');
        });
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/leaves',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password!',
    successFlash: 'You are logged in!'
}), (req, res) => {
    passport.authenticate('local')(req, res, () => {
        req.flash('success', 'You are logged in!');
        res.redirect('/leaves');
    });
});

module.exports = router;