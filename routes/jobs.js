const express = require('express');
const router = express.Router();
const getData = require('../data');


router.get('/', async (req, res) => {

    const data = await getData('jobs', 'דרושים', req.user);
    res.render('jobs.ejs', {data});

});

module.exports = router;