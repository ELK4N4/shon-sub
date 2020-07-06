const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 50
    },
    role: {
        type: String,
        default: 'user'
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema, 'Users');