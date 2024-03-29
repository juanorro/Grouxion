const constants = require('../constants');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const categories = require('../data/categories');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema ({
    name: {
        type: String, 
        required: 'Name is required'
    },

    username: {
        type: String, 
        required: 'User is required'
    },

    email: {
        type: String, 
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String, 
    },

    social: {
        googleId: String, 
        spotifyId: String, 
    },

    bio: {
        type: String, 
    }, 

    profileimg: {
        type: String, 
        default: 'https://i.blogs.es/59af6d/obama/1366_2000.jpg'
    },

    coverimg: {
        type: String, 
    },

    city: {
        type: String, 
    },

    zp: {
        type: Number,
    },

    country: {
        type: String, 
    },

    artist: {
        type: Boolean, 
        default: false
    }, 

    website: {
        type: String, 
    },
    categories: {
        type: [String],
        enum: categories.map((c) => c.id),
        default: []
    }
    },{
        timestamps: true,
        toObject: {
            virtuals: true
        }
});

userSchema.virtual('contents', {
    ref: 'Content',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

userSchema.virtual('likes', {
    ref: 'Likes',
    localField: '_id',
    foreignField: 'user',
    justOne: true
});

userSchema.virtual('follows', {
    ref: 'Follow',
    localField: '_id',
    foreignField: 'following',
    justOne: false
});

// Hace el hash del password
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(this.password, salt)
            })
            .then(hash => {
                this.password = hash, 
                next();
            })
            .catch(error => next(error));
    } else {
        next();
    }
});

// Chequea el password
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Crea el modelo
const User = mongoose.model('User', userSchema);

//Variable del modelo
module.exports = User; 