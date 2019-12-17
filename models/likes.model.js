const mongoose = require('mongoose');
const User = require('../models/user.model')
const Comment = require('../models/comment.models')
const Content = require('../models/content.models')

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Content,
        required: true
    },
   comments: {
       type: mongoose.Schema.Types.ObjectId,
       ref: Comment,
       required: false
   } 
});

const Likes = mongoose.model('Likes', likeSchema);

module.exports = Likes;