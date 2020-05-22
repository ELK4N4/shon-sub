const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index.ejs', {name: "index"});

    console.log('---------------------\n New user connected! \n---------------------');
});

module.exports = router;