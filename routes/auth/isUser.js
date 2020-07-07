module.exports = function (user) {
    if(user.role.includes('user')) {
        return true;
    } else {
        return false;
    }
}