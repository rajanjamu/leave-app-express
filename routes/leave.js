const express   = require('express'),
      router    = express.Router();

// INDEX
router.get('/leaves', (req, res) => {
    res.render('leaves/index');
});

// NEW
router.get('/leaves/new', (req, res) => {
    res.render('leaves/new');
});



module.exports = router;