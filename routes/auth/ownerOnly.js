const jwt = require('jsonwebtoken');
const isOwner = require('./isOwner');

module.exports = async function (req,res,next) {
    if(!isOwner(req.user)) {
        return res.status(403).redirect('/');
    }
    next();
}