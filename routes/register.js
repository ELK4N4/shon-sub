const express = require('express');
const router = express.Router();
const getData = require('../data');

router.get('/', async (req, res) => {

    const data = await getData('register', 'הירשם', req.user);
    res.render('register.ejs', {data});
});

module.exports = router;