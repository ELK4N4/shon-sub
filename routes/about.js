const express = require('express');
const router = express.Router();
const getData = require('../data');


router.get('/', async (req, res) => {

    const data = await getData('about', req.user);
    res.render('about.ejs', {data});

});

module.exports = router;