const mongoose = require('mongoose');

const commentSchema = new.mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    content: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Content'
    },

    message: {
        type: String, 
        required: true, 
        required: 'Comment is required'
    },

    date: {
        type: Date, 
        default: Date.now
    }, 
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);

