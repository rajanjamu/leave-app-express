const express       = require('express'),
      router           = express.Router();

// ROOT
router.get('/', (req, res) => {
    res.render('index');
});

// LOGIN FORM
router.get('/login', (req, res) => {
    res.render('login');
});

// REGISTER FORM
router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;