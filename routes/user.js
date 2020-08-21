const express = require('express');
const router = express.Router();
const getData = require('../data');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const isAdmin = require('./auth/isAdmin');
const adminOnly = require('./auth/adminOnly');
const ownerOnly = require('./auth/ownerOnly');
const validation = require('../validation');



router.get('/', async (req, res) => {
    res.redirect('/');
});

router.get('/settings', async (req, res) => {
    if(req.user.verified) {
        const data = await getData('settings', 'הגדרות', req.user);
        res.render('user/settings.ejs', {data});
    } else {
        res.status(403).redirect('/');
    }
});

router.put('/profile', async (req, res) => {
    const {error} = validation.userValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    if(req.user.verified) {

        let regexName =  `^${req.body.name}$`;

        const usernameExist = await User.findOne( {name: { $regex: regexName, $options:'i' } }); //Check if the username is exist with ignoring case sensitive
        
        if(usernameExist && req.user.name !== req.body.name) {
            return res.status(400).send('Username already exist');
        }

        let updatedUser = {
            name: req.body.name,
            profileImage: req.body.profileImage
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



router.post('/admins', ownerOnly, async (req, res) => {

    const user = await User.findOne( {name: req.body.name } ); //Check if the username is exist with ignoring case sensitive
    
    if(user && !isAdmin(user)) {
        user.role = user.role + " admin";
        user.save();
        return res.status(200).redirect('/user/settings');
    } else if (user) {
        return res.status(200).send('User already admin');
    }


    res.status(400).send('User not found');

});

router.delete('/admins', ownerOnly, async (req, res) => {

    const user = await User.findOne( {name: req.body.name } ); //Check if the username is exist with ignoring case sensitive
    
    console.log(req.body.name);

    if(user && isAdmin(user)) {
        user.role = user.role.replace(" admin", '');
        user.save();
        return res.status(200).send(user);
    }


    res.status(400).send('User not found or not admin');

});


module.exports = router;