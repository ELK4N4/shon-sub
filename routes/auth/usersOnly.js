const jwt = require('jsonwebtoken');
const isUser = require('./isUser');

module.exports = async function (req,res,next) {
    if(!isUser(req.user)) {
        return res.status(403).redirect('/');
    }
    next();
}