const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    message: {
        type: String
    },
    addedBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = commentSchema;
