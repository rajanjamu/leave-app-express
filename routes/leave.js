const express   = require('express'),
      router    = express.Router(),
      Leave     = require('../models/leave')

// INDEX
router.get('/leaves', (req, res) => {
    Leave.find({}, (err, allLeaves) => {
        if (err) return console.log(err)
        res.render('leaves', { leaves: allLeaves })
    })
});

// NEW
router.get('/leaves/new', (req, res) => {
    res.render('leaves/new');
});

// CREATE
router.post('/leaves', (req, res) => {
    Leave.create(req.body.leave, (err, createdLeave) => {
        if (err) return console.log(err);

        req.flash('success', 'Leave request successfully created!');
        res.redirect('/leaves');
    })
})

// UPDATE
router.put('/leaves/:id', (req, res) => {
    console.log(req.body.leave)
    Leave.findById(req.params.id, (err, foundLeave) => {
        console.log(foundLeave)
    })

    Leave.findByIdAndUpdate(req.params.id, req.body.leave, (err, updatedPost) => {
        if (err) return console.log(err)

        res.redirect('/leaves')
    })
})

module.exports = router;