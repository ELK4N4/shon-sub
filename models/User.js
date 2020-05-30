const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20
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
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);