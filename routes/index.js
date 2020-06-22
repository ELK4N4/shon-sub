const express = require('express');
const router = express.Router();
const getData = require('../data');


router.get('/', async (req, res) => {

    const data = await getData('home', req.user);
    res.redirect('/projects');

});

router.get('/home', (req, res) => {
    res.status(200).redirect('/');
});

module.exports = router;