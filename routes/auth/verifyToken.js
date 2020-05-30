const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async function (req,res,next) {
    const token = req.cookies['auth-token'];

    const guestUser = {
        name: "אורח",
        verified: false
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
        } catch(err) {
            req.user = guestUser;
        }
        next();
    } catch(err) {
        res.clearCookie('auth-token');
        res.status(401).send('Invalid Token');
    }
}