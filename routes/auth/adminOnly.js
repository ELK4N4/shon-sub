const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = async function (req,res,next) {
    if(!req.user.role.includes('admin')) {
        return res.status(404).redirect('/');
    }
    next();
}