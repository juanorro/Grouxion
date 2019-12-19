const createError = require('http-error');
const mongoose = require('mongoose');
const data = require('../data/categories');
const User = require('../models/user.model')

module.exports.base = (req, res, next) => {
    const users = req.params.id

    User.find().limit(9)
        .then(users => {
            res.render('index', { 
                title: 'ArtCoolT: the best continuous crowfunding platform to Creators',
                categories: data,
                users
            });
        })
};