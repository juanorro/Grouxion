const mongoose = require('mongoose');
const User = require('../models/user.model');

const followSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
        required: true        
    }
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;