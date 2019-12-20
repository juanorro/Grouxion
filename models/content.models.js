const mongoose = require('mongoose');
require('./comment.models');

const contentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    body: {
        type: String,
        required: true
    },

    image: {
        type: String, 
    }
}, {
    timestamp: true,
    toObject: {
            virtuals: true
        },
    toJSON: {
        virtuals: true
    }
})

contentSchema.pre('save', function (next) {
    next()
});

contentSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'content',
    justOne: false,    
});

contentSchema.virtual('likes', {
    ref: 'Likes',
    localField: '_id',
    foreignField: 'content',
    justOne: false
});

// contentSchema.virtual('comments', {
//     ref: 'Comment',
//     localField: '_id',
//     foreignField: 'content',
//     justOne: false,    
// });


const Content = mongoose.model('Content', contentSchema);

module.exports = Content;