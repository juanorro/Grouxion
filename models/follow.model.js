const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: User,
        required: true
    },
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;