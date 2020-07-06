const jwt = require('jsonwebtoken');
const isAdmin = require('./isAdmin');

module.exports = async function (req,res,next) {
    if(!isAdmin(req.user)) {
        return res.status(403).redirect('/');
    }
    next();
}