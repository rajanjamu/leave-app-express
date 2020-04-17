const express   = require('express'),
      router    = express.Router(),
      Leave     = require('../models/leave')

// INDEX - EMPLOYEE
router.get('/leaves/employee', isLoggedIn, (req, res) => {
    req.user.populate('leaves').execPopulate((err, user) => {
        if (err) return console.log(err)
        res.render('leaves/employee', { leaves: user.leaves })
    })
});

// INDEX - MANAGER
router.get('/leaves/manager', isLoggedInAsManager, (req, res) => {
    Leave.find({}, (err, allLeaves) => {
        if (err) return console.log(err)
        res.render('leaves/manager', { leaves: allLeaves })
    })
});

// NEW
router.get('/leaves/new', isLoggedIn, (req, res) => {
    res.render('leaves/new');
});

// CREATE
router.post('/leaves', isLoggedIn, (req, res) => {
    Leave.create(req.body.leave, (err, createdLeave) => {
        if (err) return console.log(err);

        createdLeave.author._id = req.user._id;
        createdLeave.author.username = req.user.username;
        createdLeave.save();

        req.user.leaves.push(createdLeave);
        req.user.save();

        req.flash('success', 'Leave request successfully created!');
        res.redirect('/leaves/employee');
    })
})

// UPDATE
router.put('/leaves/:id', isLoggedIn, (req, res) => {
    Leave.findByIdAndUpdate(req.params.id, req.body.leave, (err, updatedPost) => {
        if (err) return console.log(err)

        res.redirect('back')
    })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'You are not logged in. Please login!')
    res.redirect('/login')
}

function isLoggedInAsManager(req, res, next) {
    if (req.isAuthenticated()) {
        
        if (req.user.admin === true) {
            return next()
        } else {
            req.flash('error', 'You are not admin. Access denied!')
        }
    }
    req.flash('error', 'You are not logged in. Please login!')
    res.redirect('/login')
}

module.exports = router;