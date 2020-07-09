const express = require('express');
const router = express.Router();
const getData = require('../data');


router.get('/', async (req, res) => {

    const data = await getData('team', req.user);
    res.render('team.ejs', {data});

});

module.exports = router;