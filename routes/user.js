const express = require('express');
const router = express.Router();
const getData = require('../data');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const isAdmin = require('./auth/isAdmin');


router.get('/', async (req, res) => {
    res.redirect('/');
});

router.get('/settings', async (req, res) => {
    if(req.user.verified) {
        const data = await getData('settings', req.user);
        res.render('user/settings.ejs', {data});
    } else {
        res.status(403).redirect('/');
    }
});

router.put('/profile', async (req, res) => {

    if(req.user.verified) {

        let regexName =  `^${req.body.name}$`;

        const usernameExist = await User.findOne( {name: { $regex: regexName, $options:'i' } }); //Check if the username is exist with ignoring case sensitive
        
        if(usernameExist && req.user.name !== req.body.name) {
            return res.status(400).send('Username already exist');
        }

        let updatedUser = {
            name: req.body.name
        };

        
        if(req.body.password) {
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            updatedUser.password = hashedPassword;
        }

        try {

            await User.findByIdAndUpdate(req.user._id, updatedUser);
            res.status(200).send(updatedUser);

        } catch (err) {
            res.status(400).send(err);
        }

    } else {

        res.status(403).redirect('/');
    }
});

router.get('/admins', async (req, res) => {
    const admins = await User.find({role: { $regex: " admin", "$options": "i" } }, 'name');
    res.status(200).send(admins);
});



router.post('/admins', async (req, res) => {

    const user = await User.findOne( {name: req.body.name } ); //Check if the username is exist with ignoring case sensitive
    
    if(user && !isAdmin(user)) {
        user.role = user.role + " admin";
        user.save();
        return res.status(200).redirect('/user/settings');
    }


    res.status(400).send('User already admin');

});

router.delete('/admins', async (req, res) => {

    const user = await User.findOne( {name: req.body.name } ); //Check if the username is exist with ignoring case sensitive
    
    if(user && isAdmin(user)) {
        user.role = user.role.replace(" admin", '');
        user.save();
        return res.status(200).send(user);
    }


    res.status(400).send(user);

});


module.exports = router;