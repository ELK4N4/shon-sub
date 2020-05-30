const express = require('express');
const router = express.Router();
const verify = require('./auth/verifyToken');

router.get('/', verify, async (req, res) => {

    data = {
        page: {
            name: 'animes'
        },
        user: req.user
    }
    res.render('animes.ejs', data);
});

router.get('/bla', (req, res) => {
    res.send('Hello World!!!');
});

module.exports = router;