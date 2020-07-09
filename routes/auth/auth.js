const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const validation = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Login
router.post('/login', async (req, res) => {
    const {error} = validation.loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message + ' שים לב: יש להקיש מייל ולא שם משתמש!');
    }


    const user = await User.findOne({email: req.body.email});

    //checking if the user exist
    if(!user) {
        return res.status(400).send('Email or password is wrong');
    }
    //checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).send('Email or password is wrong');
    }

    //Create and assign a TOKEN
    let cookieExpires = 0;
    if(req.body.remember) {
        cookieExpires = new Date(253402300000000);
    }
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '7d'});
    res.cookie('auth-token', token, {
        expires: cookieExpires,
        httpOnly: true
    }).status(200).json({status:"ok"});;
});

//Register
router.post('/register', async (req, res) => {

    const {error} = validation.registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExist = await User.findOne({email: req.body.email});

    if(emailExist) {
        return res.status(400).send('Email already exist');
    }

    
    let regexName =  `^${req.body.name}$`;
    const usernameExist = await User.findOne( {name: { $regex: regexName, $options:'i' } }); //Check if the username is exist with ignoring case sensitive

    if(usernameExist) {
        return res.status(400).send('Username already exist');
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        console.log('bla');
        return res.status(200).json({status:"ok"});
    } catch(err) {
        return res.status(400).send(err);
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth-token').status(204).redirect('/');
});


module.exports = router;