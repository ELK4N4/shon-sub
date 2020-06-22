const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const isAdmin = require('./isAdmin');
const isOwner = require('./isOwner');

module.exports = async function (req,res,next) {
    const token = req.cookies['auth-token'];

    const guestUser = {
        name: "אורח",
        verified: false,
        role: 'guest'
    };

    if(!token) {
        req.user = guestUser;
        return next();
        //return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        
        try {
            user = await User.findOne({_id: verified._id});
            req.user = user;
            req.user.verified = true;
            req.user.admin = isAdmin(req.user);
            req.user.owner = isOwner(req.user);
        } catch(err) {
            console.log(err);
            req.user = guestUser;
        }
        next();
    } catch(err) {
        res.clearCookie('auth-token');
        res.status(401).send('Invalid Token');
    }
}