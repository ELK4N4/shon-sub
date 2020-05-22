const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs', {name: "books"});
});

router.get('/bla', (req, res) => {
    res.send('Hello World!!!');
});

module.exports = router;