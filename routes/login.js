const express = require('express');
const router = express.Router();
const verify = require('./auth/verifyToken');


router.get('/', async (req, res) => {

    data = {
        page: {
            name: 'login'
        },
        user: {
            name: "אורח"
        }
    }
    res.render('login.ejs', data);
});

router.get('/bla', (req, res) => {
    res.send('Hello World!!!');
});

module.exports = router;