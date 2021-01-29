const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new Schema({
    content: {
        type: String
    },
    picPath: {
        type: String
    },
    picName: {
        type: String
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Post', postSchema);