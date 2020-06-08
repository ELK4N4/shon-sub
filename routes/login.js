const express = require('express');
const router = express.Router();
const verify = require('./auth/verifyToken');
const getData = require('../data');


router.get('/',verify , async (req, res) => {

    if(req.user.verified) {return res.redirect('/')}

    const data = await getData('login', req.user);
    res.render('login.ejs', {data});
});

module.exports = router;