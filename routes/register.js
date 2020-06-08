const express = require('express');
const router = express.Router();
const verify = require('./auth/verifyToken');
const getData = require('../data');

router.get('/', async (req, res) => {

    const data = await getData('register', req.user);
    res.render('register.ejs', {data});
});

router.get('/bla', (req, res) => {
    res.send('Hello World!!!');
});

module.exports = router;