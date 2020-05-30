const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    data = {
        page: {
            name: 'home'
        },
        user: req.user
    }
    res.render('index.ejs', data);

    console.log('---------------------\n New user connected! \n---------------------');
});

module.exports = router;