const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = commentSchema;
