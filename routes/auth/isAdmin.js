module.exports = function (user) {
    if(user.role.includes('admin')) {
        return true;
    } else {
        return false;
    }
}