const mongoose = require('mongoose');
const path = require('path');
const coverImageBasePath = 'uploads/episodeCovers';


const episodeSchema = new mongoose.Schema({
    episodeNumber: {
        type: Number,
        require: true,
    },
    episodeName: {
        type: String,
        require: true,
        min: 2
    },
    link: {
        type: String,
        require: true
    },
    post: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    coverImageName: {
        type: String,
        default: null
    }
});

episodeSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName);
    } else {
        return path.join('/images', 'no-image.png');
    }
});

module.exports = episodeSchema;
module.exports.coverImageBasePath = coverImageBasePath;
