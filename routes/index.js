const express = require('express');
const router = express.Router();
const getData = require('../data');


router.get('/', async (req, res) => {

    const data = await getData('home', 'ראשי', req.user);
    res.render('index.ejs', {data});

});

router.get('/home', (req, res) => {
    res.status(200).redirect('/');
});

module.exports = router;