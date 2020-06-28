const mongoose = require('mongoose');
const path = require('path');
const episodeSchema = require('./Episode');
const coverImageBasePath = 'uploads/projectCovers';
const coverImageLink = 'http://shonsub.epizy.com/uploads/projectCovers/';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2    
    },
    englishName: {
        type: String,
    },
    japaneseName: {
        type: String,
    },
    process: {
        type: String,
        require: true,
        min: 1
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        min: 2,
        ref: 'User'
    },
    episodesNumber: {
        type: Number
    },
    genre: {
        type: String
    },    
    summary: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    coverImageName: {
        type: String,
        default: null
    },
    episodes: {
        type: [episodeSchema]
    }
});

projectSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
        return coverImageLink + "/" + this.coverImageName;
    } else {
        return path.join('/images', 'no-image.png');
    }
});

module.exports = mongoose.model('Project', projectSchema, 'Projects');
module.exports.coverImageBasePath = coverImageBasePath;
