const mongoose = require('mongoose');

const contentSchema = new.mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    typeContent: {
        type: String,
    },

    content: {
        type: String, 
    }
}, {
    timestamp: true
});

module.exports = mongoose.model('Content', contentSchema);