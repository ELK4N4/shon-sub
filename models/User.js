const mongoose = require('mongoose');
const path = require('path');

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
    profileImage: {
        type: String,
        default: null
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('profileImgPath').get(function() {
    if (this.profileImage != null && this.profileImage != "") {
        return this.profileImage;
    } else {
        return path.join('/images', 'no-profile.png');
    }
});

module.exports = mongoose.model('User', userSchema, 'Users');